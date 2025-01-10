import { Request, Response } from 'express';
import { HealthService } from '../services/healthService.js';

const healthService = new HealthService();

export const checkHealth = async (_req: Request, res: Response) => {
  const health = await healthService.getHealthStatus();
  res.json(health);
};
