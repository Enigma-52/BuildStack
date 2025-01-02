import { Response , Request , NextFunction } from 'express';
import { HealthService } from '../services/healthService';

const healthService = new HealthService();

export const checkHealth = async (_req: Request, res: Response , _next: NextFunction) => {
  const health = await healthService.getHealthStatus();
  res.status(200).json(health)
};
