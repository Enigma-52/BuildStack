import { Channel, ConsumeMessage } from 'amqplib';
import firebaseConfig from '../config/firebaseConfig.js';
import { ackMessage } from '../services/rabbitmq/queue.js';

const { db, setDoc, doc } = firebaseConfig;

export async function handleActivity(channel: Channel, msg: ConsumeMessage | null): Promise<void> {
    if (!msg) {
        console.log('Received null message');
        return;
    }

    try {
        const activity = JSON.parse(msg.content.toString());
        const activityId = activity.id || Date.now().toString();
        
        const activityRef = doc(db, 'activities', activityId);
        await setDoc(activityRef, activity);
        
        await ackMessage(channel, msg);
        console.log('Activity processed:', activityId);
        
    } catch (error) {
        console.error('Error processing activity:', error);
        // Depending on your error handling strategy:
        // channel.nack(msg, false, true); // Requeue
        await ackMessage(channel, msg); // or acknowledge and discard
        throw error;
    }
}