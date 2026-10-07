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
                    '$.phoneHash': {
                        type: SCHEMA_FIELD_TYPE.TAG,
                        AS: 'phoneHash',
                    },
                    '$.emailHash':{
                        type: SCHEMA_FIELD_TYPE.TAG,
                        AS: 'emailHash'
                    }
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
    async writeToRedisWithTTL(key, value,TTL = 300) {
        //for otp
        const redisObject = await this.redisDB.json.set(key,'$',value)
        await this.redisDB.expire(key, TTL)
        return redisObject || null
    }
    async writeToRedis(key, value) {
        //for user websocket no TTL remove when disconnects
        const redisObject = await this.redisDB.json.set(key, '$', value,)
        return redisObject
    }
    async readFromRedis(key) {
        const redisObject = await this.redisDB.json.get(key)
        return redisObject || null
    }
    async updateNumRedis(key, field, count) {
        const updatedRedisObject = await this.redisDB.json.numIncrBy(key, '$.' + field, count);
        return updatedRedisObject
    }

    async updateRedis(key, field, newValue) {
        await this.redisDB.json.set(key, '$.' + field, newValue);
    }

    async deleteFromRedis(key) {
        const isDeleted = await this.redisDB.json.del(key)
        return isDeleted;
    }
    async readByPhoneHash(phoneHash) {
        const redisObject = await this.redisDB.ft.search(
            'idx:otp',
            `@phoneHash:{${phoneHash}}`
        )
        console.log("From redis service: ",redisObject)
        return redisObject;
    }
    async readByEmailHash(emailHash){
        const redisObject = await this.redisDB.ft.search(
            'idx:otp',
            `@emailHash:{${emailHash}}`
        )
        return redisObject
    }
}

export default Redis
