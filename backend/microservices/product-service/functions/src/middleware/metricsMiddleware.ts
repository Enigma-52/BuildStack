import { Request, Response, NextFunction } from 'express';
import { createCustomMetric } from '../config/monitoring.js';

export async function metricsMiddleware(
    req: Request, 
    res: Response, 
    next: NextFunction
) {
    if(process.env['NODE_ENV']=="test")
        {
            return next();
        }
    const start = Date.now();

    // Track API calls
    await createCustomMetric('api_request', 1, {
        method: req.method,
        path: req.path,
        service: 'product'
    });

    // Redis cache monitoring
    const hasRedisHeader = req.headers['x-redis-cached'] === 'true';
    if (hasRedisHeader) {
        await createCustomMetric('redis_cache_hit', 1);
    }

    res.on('finish', async () => {
        const duration = Date.now() - start;
        
        await createCustomMetric('request_duration', duration, {
            method: req.method,
            path: req.path,
            status: res.statusCode.toString()
        });
    });

    next();
}

// Remove getMetrics as we're using Cloud Monitoring