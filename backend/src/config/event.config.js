const events = {
    message: {
        send: "message:send", // when client sends something
        new: "message:new" // a new message received either from client or redis
    },
    chat:{
        join: "chat:join",
        leave: "chat:leave"
    }
}
export { events }