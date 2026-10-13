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

**Errors**

409

```json
{
    "statusCode": 409,
    "message": "User already exists!",
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
    "message": "Too many attempts",
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
409
```json
{
    "statusCode": 409,
    "message": "Challenge already exists"
}
```

429
```json
{
    "statusCode": 429,
    "message": "OTP generation blocked"
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
    "message": "Too many attempts",
}
```




