# NativeChat Decisions Log

## Why we are maintaining this Log?
- To have a proof of our progress in terms of problem solving ability independent of AI
- We know, software is not immune from blunders while we scale it, it is evolved with time
- If it is messy we own it, if it is improved, we hold the accountability too!

## Decisions - Navigating through Engineering Challenges:
1. It began with using websockets to see messages on the same server and various clients
2. Took help from web, where we learnt cross server messages require a cross server connection.
    - We implemented Redis Pub/Sub that took emitted event from any client to a common Pub/Sub
    - From there every connected server contained a Map holding username -> socketClientId
    - Our logic matched the receiver's name with socketClientId, that's how we identified which server and hence which client has to receive that message
    - Event Logic: 
        - On the sender side an event called "event:send" is emitted to Server, the server catches it by 
        ```javascript
        .on("event:send")
        ```
        listener
        - On the the server further emits an event called 
        "event:new" to Redis and afterwards, client on receiver side listens to it via 
        ```javascript
        .on("event:new")
        ```
3. **Authentication**: We used an API that allows us to send 50 SMS/day and 300 SMS/month for free via our SIM's valid plan
We generate OTPs for sign up/registration via this service, and chose not to give email as an alternative due to the fact that email could be unreliable, and for our app's core features, phone number has to be verified in the first place - despite the low SMS limits
4. **Why Not Twillio?** - Twillio didnt even let us test our application, locked us in with their templates, their API docs, and overall website was a pain to use - just AI generated slop we regretted creating an account on it and ditched their service!
5. **Using SMTP just for Login OTPs** - We decided that low rate limits for SMS OTPs exist, hence we allow our users to authenticate via an email, where they'd get better OTP regeneration limits, while they are required to successfully verify their phone number during sign up!
6. **Caching could risk our users' security?** - We have used caching OTP details but later realised, identifier details were stored in plain text in Redis, hence we switched to storing it in secure cipher text on Redis while our application still manages to validate auth requests
7. **Rate Limiting Exists Even Beyond OTP Regeneration?** - This is after we learnt that CORS would just stop clients accessing out endpoints via browsers, while direct HTTP requests like curl, could bypass limiting which could affect our server cost! To ensure server costs stay manageable, we are putting a global ip based per second rate limiting with the help of express rate limiter.


