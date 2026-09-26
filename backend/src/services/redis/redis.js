import { createClient } from "redis"

class Redis {

    constructor() {
        this.subscriber = createClient({
            url: "redis://localhost:6379"
        })

        this.publisher = createClient({
            url: "redis://localhost:6379"
        })
    }

    async initRedis() {

        await this.subscriber.connect()
        console.log("subscriber connected")
        await this.publisher.connect()
        console.log("publisher connected")
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
}

export default Redis