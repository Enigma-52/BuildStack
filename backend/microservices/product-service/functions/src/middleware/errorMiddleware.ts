import { Request, Response, NextFunction } from 'express';
import { createCustomMetric } from '../config/monitoring.js';

export async function errorMiddleware(
    err: any, 
    req: Request, 
    res: Response, 
    _next: NextFunction
) {
    return _next();
    if(process.env['NODE_ENV']=="test")
    {
        return _next();
    }
    // Track errors with service context
    await createCustomMetric('error', 1, {
        type: err.name || 'UnknownError',
        path: req.path,
        service: 'product',
        code: err.statusCode?.toString() || '500'
    });

    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message || 'Internal Server Error',
        stack: err.stack || undefined
    });
}