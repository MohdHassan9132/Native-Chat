# WHY AND HOW OTP BASED AUTH

## WHY

Our main user identity is the phonenumber itself and if we cannot verify the phonenumber anyone can create account with anybody else phonenumber hence we implemented the OTP based auth and we also implemented the redis memory as well since the data is not long lived and also size is small but time crucial redis is prefect since its fast retrieval helps the dota dont take much memory.


```json
otp:challenge:uuid: {
    "purpose": "login" || "register",
    "identifierHash": "HmacHash",
    "identifierType": "phoneNumber" || "email",
    "encryptedIdentifier": "2uGzjHJGdKmlRJ0O:3zUIopQWEVcD89XhJg==:nL8QpUz4YGQCzvVh04q7Mw==",
    "otpHash": "d7b9ff1013159a1146f30ec9c7b1d4c010b49f476479acf37ffcd4a4219bda9d",
    "verificationAttempts": 3,
    "regenerationAttempts": 3
}
```

login can be done by both but singup is restricted to phonenumber

TTL in redis for an otp is 5 minutes

## HOW

In the normal phonenumber and password approach it was take phonenumber and password validate through zod defined schema if validate hash using brcypt and save in the db.

It had two flaws the plain storing of user identification in db, any db breach can leak the user details and anyone can use anybody else number.


## What Changed

### Generation

instead of taking password, we are taking just the phonenumber validate it using zod through regex E.164 format that says that it should start with country code then areadcode and then subscriber number upto 12 digits. the server then generates otp through otp service but before that we are making hashing and encrypting the identifier. The encryption so that we can decrypt once done and then store in the db and hashing it so that we find an otp object and if it already exists we can restrict generating more and once done we are using textbee api that allow converting our phone and package to send messages to user and once it acknowledge we return the challangeId and if challengeId already exist we are returning it with the tag alreadyExists as true.

### Validation

Client return the challengeId and user entered otp. we fetch the redis object through the challengeId validate the otp by converting the user entered into hmacHash if valid remove the otp object from redis, decrypt the user identifier save in the db and return the refresh and access token. if not valid minus the validationAttemps until at third the user gets blocked in the redis. refreshToken is saved in the db as hashed and used for refreshing the access token and accessToken is required for websocket connection or any api call request from the client


```json
identifierHash: {
    "Blocked": true,
    "BlockedUntil": "2026-10-26T10:39:04.798Z"
}
```

Rate limits for now are only applied as global rate limits to save the textbee limits we get 150req/day so regsiter and login are restricited to only 3 per hour and their validation 9 since each otp have three tries.
Captcha and ip based based are still left 

## Drawbacks

server is still storing plain user details in the db.

If someone get the challengeId and right otp it can get the accessToken and refreshToken of the user and can request data from the server

OTP failure delivery is still not handled.

Server is creating otp on the base of check and then act. if two request arrive the same they will lead to creation of two otps underone identifier.

