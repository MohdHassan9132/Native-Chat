import { createClient } from "redis"
class Redis {
    constructor(){
        this.subscriber = createClient({
            url: 'redis://localhost:6379'
        })
        this.publisher = createClient({
            url: 'redis://localhost:6379'
        }) 
    }
    async initRedis(){
        if(await this.subscriber.connect()){
            console.log(`subscriber connected`)
        }
        if(await this.publisher.connect()){
            console.log(`publisher connected`)
        }
    }
    async publish(channel,message){
        await this.publisher.publish(channel,message)
    }
    async redisSubscriber(channel){
        await this.subscriber.subscribe(channel,(data)=>{
            console.log(data)
            return data
        })
    }
}
export default Redis