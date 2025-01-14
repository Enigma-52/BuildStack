import { https } from 'firebase-functions';
import app from './app.js';

export const coverageReportsFunction = https.onRequest(app);