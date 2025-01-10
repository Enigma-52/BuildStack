import { https } from 'firebase-functions';
import app from './app.js';

export const buildstackProductServiceFunction = https.onRequest(app);