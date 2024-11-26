import { Request, Response } from 'express';
import { HealthService } from '../services/healthService';

const healthService = new HealthService();

export const checkHealth = async (req: Request, res: Response) => {
  const health = await healthService.getHealthStatus();
  res.json(health);
};
