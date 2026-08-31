import http from 'http'
import {createClient} from 'redis'
import { Server } from 'socket.io'
const httpServer = http.createServer((req, res) => {
    if (req.method === 'GET') {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({
            message: "Hello from backend",
        }));
    }

});
const webSocket = new Server(httpServer,{
    cors:{
        origin: "http://localhost:3000"
    }
})
webSocket.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("message", async (message) => {
        console.log("Message from client:", message);

        await redis.publish(
            "messages",
            JSON.stringify(message)
        );
    });
    redis.subscribe('messages',(message)=>{
        console.log(`message recieved from redis ${message}`);
        webSocket.emit('message',{
            message: message
        });
})
    
    
});
httpServer.listen(8000,()=>{
    
    console.log("http server is listening on port 8000")
})

const redis = createClient({
    url: 'redis://localhost:9000',
})
if(await redis.connect()){
    console.log("Redis connected succesfully")
}




