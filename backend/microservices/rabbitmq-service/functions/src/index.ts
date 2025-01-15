import { https } from 'firebase-functions';
import app from './app.js';

export const rabbitMQFunction = https.onRequest(app);