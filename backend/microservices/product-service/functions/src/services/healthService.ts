export class HealthService {
    public async getHealthStatus() {
      return {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      };
    }
  }
  