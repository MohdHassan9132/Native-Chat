import { createClient, SCHEMA_FIELD_TYPE } from "redis"

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
    async initIndex() {
        try {
            await this.redisDB.ft.create(
                'idx:otp',
                {
                    '$.identifierHash': {
                        type: SCHEMA_FIELD_TYPE.TAG,
                        AS: 'identifierHash',
                    },
                },
                {
                    ON: 'JSON',
                    PREFIX: 'otp:challenge:',
                }
            );
            console.log('Redis index created')
        } catch (error) {
            if (error.message.includes('SEARCH_INDEX_EXISTS')) {
                console.log('Redis index already exists')
            } else {
                throw error
            }
        }
    }
    async createWithTTL(key, value,TTL = 300) {
        const redisObject = await this.redisDB.json.set(key,'$',value)
        await this.redisDB.expire(key, TTL)
        return redisObject || null
    }
    async create(key, value) {
        //for user websocket no TTL remove when disconnects
        return await this.redisDB.json.set(key, '$', value,)
    }
    async get(key) {
        return await this.redisDB.json.get(key)
    }
    async Increment(key, field, count) {
        return await this.redisDB.json.numIncrBy(key, '$.' + field, count);
    }
     async search(index, query) {
        return await this.redisDB.ft.search(index,query)
    }

    async update(key, field, newValue) {
        return await this.redisDB.json.set(key, '$.' + field, newValue);
    }

    async delete(key) {
        return await this.redisDB.json.del(key)
    }
}

export default Redis
