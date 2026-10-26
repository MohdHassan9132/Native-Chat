# Native Chat — Technology Stack

Native Chat is an attempt to create a fully scalable chat app for 1M concurrent users.

We are using the following technology.

## Express
Provides HTTP routing, request/response handling and custom middleware integrations.

## Socket.IO
To create persistant connection with client to handle events like chats, call, video calls etc.

## Postgres
Both NoSQL and SQL are viable but postgres is overall better due to relations, transactions. But migrations needs to planned.

## Redis
Provides memory db for short lived states like OTPs and fast retrievel. Using for fanning the events from client to all the server.

## Prisma
Provides strict validation before sending request to db. Handle SQL quries for creating Tables and data writes. Maintain the history of how overall the db has changed through Migration. Protects from query injection through its own generated client.

## Zod
Provides well-defined rules for validating different data types, including regex patterns, schema-based validation, and custom error messages for invalid data.

## JSON Web Tokens
Provides authentication through signed tokens that have user identity stored. It creates and validates whether the coming token is signed by the server or not.