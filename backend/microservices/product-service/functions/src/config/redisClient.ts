import { createClient } from 'redis';

const client = createClient({
    username: 'default',
    password: 'DYPAZMLY0lyqq1kQm4MKWQ7YvbhQ8XGX',
    socket: {
        host: 'redis-16703.c301.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 16703
    }
});

client.on('error', err => console.log('Redis Client Error', err));

// Create an initialization function
export const initRedis = async () => {
    try {
        await client.connect();
        await client.set('foo', 'bar');
        const result = await client.get('foo');
        console.log('Redis Connection Test:', result);
        return true;
    } catch (error) {
        console.error('Redis initialization error:', error);
        return false;
    }
};

// Add a disconnect function for cleanup
export const disconnectRedis = async () => {
    try {
        await client.quit();
        console.log('Redis disconnected');
    } catch (error) {
        console.error('Redis disconnect error:', error);
    }
};

export default client;