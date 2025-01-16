import { it, describe, expect, beforeAll, afterAll } from '@jest/globals';
import { getRedisClient, initRedis, disconnectRedis } from '../src/config/redisClient';

describe('Redis Client', () => {
    beforeAll(async () => {
        await disconnectRedis(); // Ensure clean state
    });

    afterAll(async () => {
        await disconnectRedis(); // Clean up after all tests
    });

    it('should get the same Redis client instance on multiple calls', () => {
        const client1 = getRedisClient();
        const client2 = getRedisClient();
        expect(client1).toBe(client2);
    });

    it('should successfully initialize Redis connection', async () => {
        const result = await initRedis();
        expect(result).toBe(true);

        // Verify connection by performing a simple operation
        const client = getRedisClient();
        const testValue = await client.get('foo');
        expect(testValue).toBe('bar');
    });

    it('should successfully disconnect Redis', async () => {
        // First ensure we're connected
        await initRedis();
        const client = getRedisClient();
        expect(client.isOpen).toBe(true);

        // Then disconnect
        await disconnectRedis();
        expect(client.isOpen).toBe(false);
    });
});