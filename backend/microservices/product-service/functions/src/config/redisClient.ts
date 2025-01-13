// src/config/redisClient.ts
import { createClient, RedisClientType } from 'redis';

let client: RedisClientType | null = null;

export const getRedisClient = (): RedisClientType => {
    if (!client) {
        client = createClient({
            username: 'default',
            password: 'DYPAZMLY0lyqq1kQm4MKWQ7YvbhQ8XGX',
            socket: {
                host: 'redis-16703.c301.ap-south-1-1.ec2.redns.redis-cloud.com',
                port: 16703
            }
        });

        client.on('error', (err: Error) => console.log('Redis Client Error', err));
    }
    return client;
};

export const initRedis = async () => {
    try {
        const redisClient = getRedisClient();
        if (!redisClient.isOpen) {
            await redisClient.connect();
            await redisClient.set('foo', 'bar');
            const result = await redisClient.get('foo');
            console.log('Redis Connection Test:', result);
        }
        return true;
    } catch (error) {
        console.error('Redis initialization error:', error);
        return false;
    }
};

export const disconnectRedis = async () => {
    try {
        if (client && client.isOpen) {
            await client.quit();
            client = null;
            console.log('Redis disconnected successfully');
        }
    } catch (error) {
        console.error('Redis disconnect error:', error);
        throw error;
    }
};

export default getRedisClient;