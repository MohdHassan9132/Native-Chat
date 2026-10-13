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

ContentType: application/json

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
    "data": null
}
```

## POST/register/verify

### Request Syntax

```http
POST/register/verify
```

### Request Body

ContentType: application/json

```json
{
    "challengeId": "1cf9d48f-69cb-4ced-80bc-5f1dd6d3c6cf",
    "OTP": "121213"
}
```

### Responses

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
    "data": null
}
```

404

```json
{
    "statusCode": 404,
    "message": "Challenge not found",
    "data": null
}
```

429

```json
{
    "statusCode": 429,
    "message": "Too many attempts",
    "data": null
}
```

## POST/login

### Request Syntax

```http
POST/login
```

### Request Body

```json
{}
```
