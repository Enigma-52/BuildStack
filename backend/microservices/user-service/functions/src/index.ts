import { https } from 'firebase-functions';
import app from './app.js';

export const buildstackUserServiceFunction = https.onRequest(app);