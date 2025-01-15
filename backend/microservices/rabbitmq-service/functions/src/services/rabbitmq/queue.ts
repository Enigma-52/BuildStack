import { Channel } from 'amqplib';
import { RABBITMQ_CONFIG } from '../../config/rabbitmqConfig.js';
import { getChannel } from './connection.js';

export async function assertQueue(): Promise<void> {
    const channel = getChannel();
    if (!channel) {
        throw new Error('Channel not established');
    }

    try {
        await channel.assertQueue(RABBITMQ_CONFIG.queue, RABBITMQ_CONFIG.options);
        console.log('Queue asserted:', RABBITMQ_CONFIG.queue);
    } catch (error) {
        console.error('Failed to assert queue:', error);
        throw error;
    }
}

export async function ackMessage(channel: Channel, msg: any): Promise<void> {
    try {
        channel.ack(msg);
        console.log('Message acknowledged');
    } catch (error) {
        console.error('Failed to acknowledge message:', error);
        throw error;
    }
}