# Auth

## Base URL:

```html
http://localhost:8000/api/auth
```

## Endpoints

| HTTP Method | Path             | Purpose                              |
| ----------- | ---------------- | ------------------------------------ |
| POST        | /register        | User registration using phone number |
| POST        | /register/verify | Verify registraion using sent OTP    |
| POST        | /login           | Login via phone number or email      |
| POST        | /login/verify    | Verify login via a valid OTP         |

## POST/register

### Request Syntax

```http
POST/register
```

### Request Body

```http
Content-Type: application/json
```

```json
{
    "phoneNumber": "+91xxxxxxxxxx"
}
```

### Responses

**Success**

200

```json
{
    "statusCode": 200,
    "message": "OTP sent successfully",
    "data": {
        "challengeId": "1cf9d48f-69cb-4ced-80bc-5f1dd6d3c6cf"
    }
}
```

200 (when a valid challenge for the same purpose is already active)

The API returns the existing `challengeId` with `alreadyExists: true`; the existing OTP remains valid and a duplicate code is not generated.

```json
{
    "statusCode": 200,
    "message": "An OTP is already active",
    "data": {
        "challengeId": "1cf9d48f-69cb-4ced-80bc-5f1dd6d3c6cf",
        "alreadyExists": true
    }
}
```

**Errors**

409 (user already exists, or a challenge exists for a different verification purpose/contact type)

```json
{
    "statusCode": 409,
    "message": "User already exists!",
}
```

429 (the contact is temporarily blocked)

The response includes the UTC `blockedUntil` timestamp and the alternate contact type that can be used to sign in.

```json
{
    "statusCode": 429,
    "message": "This contact is temporarily blocked",
    "data": {
        "blockedUntil": "2026-10-22T12:00:00.000Z",
        "identifierType": "phoneNumber",
        "alternateIdentifierType": "email"
    }
}
```

## POST/register/verify

### Request Syntax

```http
POST/register/verify
```

### Request Body

```http
Content-Type: application/json
```

```json
{
    "challengeId": "1cf9d48f-69cb-4ced-80bc-5f1dd6d3c6cf",
    "OTP": "121213"
}
```

### Responses

**Success**

201

```json
{
    "statusCode": "201",
    "message": "User created successfully",
    "data": {
    "phoneNumber": "+91xxxxxxxxxx";
    "refreshToken" : null;
    "userId" : "5d9028de-69c6-41ed-8bd7-b58e8b44311d"
    "name": null;
    "email": null;
    "profilePicture": null;
    "bio": null;
    "createdAt": "2026-10-13T06:35:00.000Z";
    "updatedAt": "2026-10-13T06:35:00.000Z";
    "lastSeen": null;
    "status": null;
    "isBlocked": false;
    }
}
```

**Errors**

401

```json
{
    "statusCode": 401,
    "message": "Invalid OTP",
}
```

404

```json
{
    "statusCode": 404,
    "message": "Challenge not found",
}
```

429

```json
{
    "statusCode": 429,
    "message": "This contact is temporarily blocked",
    "data": {
        "blockedUntil": "2026-10-22T12:00:00.000Z",
        "identifierType": "phoneNumber",
        "alternateIdentifierType": "email"
    }
}
```

## POST/login

### Request Syntax

```http
POST/login
```

### Request Body

```http
Content-Type: application/json
```

**With Contact Number**
```json

{
    "identifier": "+91**********"
}
```
**With Email**
```json
{
    "identifier": "support@nativechat.com"
}
```

### Responses
**Success**

200
```json
{
    "statusCode": 200,
    "message": "OTP sent successfully",
    "data": {
        "challengeId": "180f63d1-3628-4239-b53f-23a11e8b22f0"
    }
}
```

**Errors**

404

```json
{
    "statusCode": 404,
    "message": "User not found"
}
```
200 (when a valid login challenge for the same identifier is already active; returns its existing `challengeId` and `alreadyExists: true` without generating another OTP)

409 (a challenge exists for a different verification purpose/contact type)
```json
{
    "statusCode": 409,
    "message": "A verification is already in progress for this contact"
}
```

429
```json
{
    "statusCode": 429,
    "message": "This contact is temporarily blocked",
    "data": {
        "blockedUntil": "2026-10-22T12:00:00.000Z",
        "identifierType": "email",
        "alternateIdentifierType": "phoneNumber"
    }
}
```

## POST/login/verify

```http
POST/login/verify
```

### RequestBody
```http
Content-Type: application/json
```

```json
{
    "challengeId":"84dbf03d-5091-4467-9f1e-b752322a25a4",
    "userOTP":"272860"
}
```

### Responses

**Success**

200

```json
{
    "statusCode": 200,
    "message": "user logged in successfully",
    "data": {
        "userData": {
            "userId": "",
            "name": "Mohammad Hassan",
            "phoneNumber": "+91**********",
            "email": "support@nativechat.com",
            "profilePicture": null,
            "bio": null,
            "createdAt": null,
            "updatedAt": null,
            "lastSeen": null,
            "status": null,
            "refreshToken": "c*****b39f",
            "isBlocked": false
        }
    }
}
```

**Errors**

401

```json
{
    "statusCode": 401,
    "message": "Invalid OTP",
}
```

404

```json
{
    "statusCode": 404,
    "message": "Challenge not found",
}
```

429

```json
{
    "statusCode": 429,
    "message": "This contact is temporarily blocked",
    "data": {
        "blockedUntil": "2026-10-22T12:00:00.000Z",
        "identifierType": "email",
        "alternateIdentifierType": "phoneNumber"
    }
}
```




