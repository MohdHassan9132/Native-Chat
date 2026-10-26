# Auth — Current Architecture

## WHY

Our main user identity is the phone number itself. If we cannot verify the phone number, anyone can create an account using somebody else's number. So instead of using the normal phone number and password approach, we use OTP-based authentication.

We allow users to register using their phone number, while login can be done using either a phone number or email.

We use Redis for OTP challenges because this data is short-lived, small in size, and requires fast retrieval. PostgreSQL stores the permanent user data, while Redis stores the temporary verification state.

## HOW

### Registration

1. The user sends their `phoneNumber` to the `/register` endpoint.

2. The request first passes through the rate limiter. Currently, registration is limited to 3 requests per hour.

3. The request reaches the `register` controller, which extracts the phone number from `req.body` and calls `authService.register()`.

4. The Auth service validates the phone number using `validatePhoneNumber`. It then checks PostgreSQL through `userRepo` to see whether an account with that phone number already exists. If it does, the request fails with a `409` error.

5. If the user does not exist, the service generates a UUID as the `challengeId` and calls `otpService.generateOTP()`.

6. The OTP service first creates an HMAC hash of the phone number. It checks Redis to see whether that phone number is temporarily blocked. If blocked, it returns a `429` error.

7. The service searches Redis for an existing OTP challenge associated with the same identifier hash. If an active challenge exists for the same purpose and identifier type, it returns the existing `challengeId` with `alreadyExists: true`. If a conflicting verification is in progress, it returns a `409` error.

8. If no challenge exists, the service encrypts the phone number using AES-256-GCM, generates a six-digit OTP, and creates an HMAC hash of that OTP. It stores the challenge object in Redis with a default TTL of 5 minutes.

9. The challenge contains the purpose, identifier hash, identifier type, encrypted identifier, OTP hash, verification attempts, and regeneration attempts.

10. The Auth service then attempts to send the OTP through `smsService`, which uses the TextBee API. If delivery is reported as unsuccessful, the service throws a `503` error.

11. The controller returns the `challengeId` and `alreadyExists` flag to the client.

### OTP Storage

We do not need to store the original OTP in Redis. Instead, we store its HMAC hash and compare it with the HMAC hash of the OTP submitted by the user.

We use two representations of the identifier:

- `identifierHash`: used to find existing challenges and blocked contacts without searching by the raw phone number or email.
- `encryptedIdentifier`: used to recover the original identifier after successful verification.

The Redis challenge key follows this format:

`otp:challenge:<challengeId>`

The challenge expires after 5 minutes. Redis uses the `idx:otp` search index on `identifierHash` to find challenges belonging to an identifier.

### Registration Verification

1. The client sends the `challengeId` and `userOTP` to `/register/verify`.

2. The request passes through the rate limiter and reaches the `verifyRegistration` controller.

3. The controller calls `authService.verifyRegistration()`, which calls `otpService.validateOTP()`.

4. The OTP service retrieves the challenge object from Redis using the `challengeId`. If the challenge does not exist, verification fails.

5. The service creates an HMAC hash of the submitted OTP and compares it with the stored OTP hash.

6. If the OTP is incorrect, the service decreases `verificationAttempts`. When the remaining attempts reach zero, it creates a block entry in Redis with a 24-hour TTL, deletes the challenge, and returns a `429` error. Otherwise, it returns a `401` error.

7. If the OTP is correct, the service deletes the challenge from Redis and returns its data to the Auth service.

8. The Auth service decrypts the identifier and creates the user in PostgreSQL through `userRepo`.

9. After the user is created, the service generates an access token and a refresh token using the JWT service.

10. The refresh token is HMAC-hashed and its hash is saved in PostgreSQL against the user's ID. The raw refresh token is returned to the client, not stored in the database by this flow.

11. The controller sets the access and refresh tokens as cookies and returns the created user's data.

### Login

1. The user sends an `identifier` to `/login`. This can be either a phone number or an email address.

2. The request passes through the rate limiter and reaches the `login` controller.

3. The Auth service checks that the identifier is a string. It identifies the type by checking whether it contains `@`. Email identifiers go through `validateEmail`; phone numbers go through `validatePhoneNumber`.

4. The service searches PostgreSQL for the corresponding user. If no user exists, it returns a `404` error.

5. The service generates a `challengeId` and calls `otpService.generateOTP()` with the identifier, identifier type, and `login` purpose.

6. The OTP service follows the same blocking, duplicate-challenge, encryption, hashing, and Redis storage process used during registration.

7. If the identifier is a phone number, the Auth service calls `smsService.sendSMS()`. If it is an email address, it calls `nodemailerInstance.sendEmail()`, which sends the email through the configured SMTP transport.

8. If the challenge already exists, the service returns the existing `challengeId` with `alreadyExists: true`. Otherwise, it returns the newly created `challengeId`.

9. The controller responds with the challenge information. The client then submits the OTP to `/login/verify`.

### Login Verification

1. The client sends the `challengeId` and `userOTP` to `/login/verify`.

2. The controller calls `authService.verifyLogin()`, which delegates OTP validation to the OTP service.

3. If the OTP is incorrect, the same verification-attempt and temporary-blocking logic applies. If it is correct, the challenge is deleted from Redis.

4. The Auth service decrypts the identifier stored in the challenge and retrieves the user from PostgreSQL using either their email or phone number.

5. The JWT service generates the access token and refresh token.

6. The service HMAC-hashes the refresh token and saves the hash in PostgreSQL.

7. The controller sets both tokens as cookies and returns the user's data.

## Rate Limiting

We use a custom `rateLimiter` middleware built on `express-rate-limit`.

The limiter is applied to the Auth routes before the controller executes:

- `/register`: 3 requests per hour.
- `/register/verify`: 9 requests per hour.
- `/login`: 3 requests per hour.
- `/login/verify`: 9 requests per hour.

These limits currently help reduce excessive requests to the authentication endpoints and control OTP delivery usage. The limits on the verification routes are not the same thing as the three attempts stored inside each OTP challenge; both mechanisms exist separately.

IP-based custom limits and CAPTCHA are still pending.

## JWT Authentication

The JWT service generates two signed tokens:

- **Access token:** used to authenticate API requests and Socket.IO connections.
- **Refresh token:** intended to obtain renewed authentication without repeating the entire OTP login flow.

Both tokens contain the user's ID and use separate secrets and expiry configurations.

The refresh token is stored in the database as an HMAC hash rather than as the raw token.

The `verifyJWT` middleware reads the access token from the request cookies, verifies its signature and expiry, and attaches the decoded payload to `req.user`. Protected HTTP routes can then use this middleware to authenticate requests.

## WebSocket Authentication

We use Socket.IO to maintain persistent connections between the client and server.

When a client connects, the WebSocket authentication middleware reads the token from `socket.handshake.auth.token`.

The JWT service verifies the token. The middleware then retrieves the user from PostgreSQL using the ID in the token. If the token is missing, invalid, expired, or the user no longer exists, the connection is rejected.

If authentication succeeds, the decoded user payload is attached to `socket.handshake.user`, and the connection is allowed to continue.

The WebSocket wrapper also provides methods to emit events to all connected clients or to a specific socket ID.

## Current Limitations

- User details are still stored in PostgreSQL as normal fields. Sensitive data protection at rest needs further consideration.
- OTP verification is not atomic as a complete operation. Although Redis decrements the attempt counter atomically, fetching the challenge, comparing the OTP, decrementing attempts, and creating the block are separate operations.
- OTP delivery failure and challenge cleanup need a more robust recovery strategy.
- The current OTP implementation includes a regeneration-attempt field, but the shown service does not yet implement a complete OTP regeneration flow.
- CAPTCHA and additional IP-based rate limiting are not implemented.
- The current phone registration code needs verification: it logs the generated OTP and calls `sendSMS()` using an `otp` variable that is not defined in the shown method. As written, this can prevent registration OTP delivery from working.
- The current login implementation also logs the OTP. These logs must be removed before production.
- The refresh-token generation and storage are implemented, but a complete refresh endpoint and its rotation/revocation behavior are not shown in the provided code.
- The target of 1 million concurrent users is an architectural goal, not a confirmed benchmark result. Load testing and performance measurements are still required.

