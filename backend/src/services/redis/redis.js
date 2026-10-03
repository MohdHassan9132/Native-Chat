import { createClient } from "redis"

class Redis {

    constructor() {
        this.subscriber = createClient({
            url: process.env.REDIS_URL
        })

        this.publisher = createClient({
            url: process.env.REDIS_URL
        })
        this.redisDB = createClient({
            url: process.env.REDIS_URL
        })
    }

    async initRedis() {

        await this.subscriber.connect()
        console.log("subscriber connected")
        await this.publisher.connect()
        console.log("publisher connected")
        await this.redisDB.connect()
    }

    async publish(channel, message) {

        await this.publisher.publish(
            channel,
            message
        )
    }

    async redisSubscriber(channel, callback) {

        await this.subscriber.subscribe(
            channel,
            callback
        )
    }
    async writeToRedisWithTTL(key,value){
        //for otp
        const redisObject = await this.redisDB.json.set(key,'$',value)
        await this.redisDB.expire(key,300)
        return redisObject||null
    }
    async writeToRedis(key,value){
        //for user websocket no TTL remove when disconnects
        const redisObject = await this.redisDB.json.set(key,'$',value)
        return redisObject
    }
    async readFromRedis(key){
        const redisObject = await this.redisDB.json.get(key)
        return redisObject || null
    }
    async updateNumRedis(key, field, count) {
        await this.redisDB.json.numIncrBy(key , '$.' + field, count);
    }

    async updateRedis(key, field,newValue) {
        await this.redisDB.json.set(key, '$.' + field, newValue);
    }

    async deleteFromRedis(key){
        const isDeleted = await this.redisDB.json.del(key)
        return isDeleted;
    }
}

export default Redis