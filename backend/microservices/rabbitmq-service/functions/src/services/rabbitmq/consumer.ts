import { connect, createChannel, disconnect } from './connection.js';
import { assertQueue } from './queue.js';
import { handleActivity } from '../../handlers/activityHandler.js';
import { RABBITMQ_CONFIG } from '../../config/rabbitmqConfig.js';

export async function startConsumer(): Promise<void> {
    try {
        const connection = await connect();
        const channel = await createChannel();
        await assertQueue();

        channel.consume(RABBITMQ_CONFIG.queue, 
            async (msg) => handleActivity(channel, msg)
        );

        console.log('Consumer started successfully');
    } catch (error) {
        await disconnect();
        throw error;
    }
}

export async function stopConsumer(): Promise<void> {
    await disconnect();
    console.log('Consumer stopped successfully');
}