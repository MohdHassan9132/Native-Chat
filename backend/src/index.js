// import http from 'http'
// import Redis from './services/redis/redis';
// import WebSocket from './services/webSocket/websocket';
// const httpServer = http.createServer((req, res) => {
//     if (req.method === 'GET') {
//         res.writeHead(200, { "content-type": "application/json" });
//         res.end(JSON.stringify({
//             message: "Hello from backend",
//         }));
//     }

// });
// const webSocket = new Server(httpServer,{
//     cors:{
//         origin: "http://localhost:3000"
//     }
// })
// webSocket.on("connection", (socket) => {
//     console.log(socket.id);

//     socket.on("message", async (message) => {
//         console.log("Message from client:", message);

//         await redis.publish(
//             "messages",
//             JSON.stringify(message)
//         );
//     });
//     redis.subscribe('messages',(message)=>{
//         console.log(`message recieved from redis ${message}`);
//         webSocket.emit('message',{
//             message: message
//         });
// })
    
    
// });
// httpServer.listen(8000,()=>{
    
//     console.log("http server is listening on port 8000")
// })

// const redis = createClient({
//     url: 'redis://localhost:6379',
// })
// if(await redis.connect()){
//     console.log("Redis connected succesfully")
// }else{
//     console.log("Redis connection failed")
// }

import http from 'http'
import Redis from './services/redis/redis.js';
import WebSocket from './services/webSocket/websocket.js';
import MessageService from './services/messages/messages.js';
import { eventRouter } from './router/event.router.js';
import UserService from './services/user/user.service.js';
const httpServer = http.createServer((req, res) => {
    if (req.method === 'GET') {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({
            message: "Hello from backend",
        }));
    }

});
const webSocket = new WebSocket(httpServer)
const userService = new UserService()

const redis = new Redis()
const messagingService = new MessageService(redis,webSocket)
webSocket.initListeners((socket)=>{
    userService.insertUser({
        username: socket.handshake.query.username,
        socketId: socket.id    })
    eventRouter(socket,messagingService)
})

redis.initRedis()


httpServer.listen(process.env.PORT || 8000,()=>{
    console.log(`httpServer is running on the PORT${process.env.PORT || 8000}`)
})









