import express, { Request, Response } from 'express';
import cors from 'cors';
import { startConsumer, stopConsumer } from './services/rabbitmq/consumer.js';

const app = express();

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
    credentials: false
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
    res.status(200).json({ message: 'All good' });
});

app.post('/consumer/start', async (req: Request, res: Response) => {
    try {
        await startConsumer();
        res.status(200).json({ message: 'Consumer started successfully' });
    } catch (error) {
        console.error('Failed to start consumer:', error);
        res.status(500).json({ 
            message: 'Failed to start consumer', 
            error: error 
        });
    }
});

app.post('/consumer/stop', async (req: Request, res: Response) => {
    try {
        await stopConsumer();
        res.status(200).json({ message: 'Consumer stopped successfully' });
    } catch (error) {
        console.error('Failed to stop consumer:', error);
        res.status(500).json({ 
            message: 'Failed to stop consumer', 
            error: error 
        });
    }
});

export default app;