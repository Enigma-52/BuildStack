import { Request, Response, NextFunction } from 'express';
import { createCustomMetric } from '../config/monitoring.js';

export const monitorRoute = (operationName: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        return next();
        if(process.env['NODE_ENV']=="test")
            {
                return next();
            }
        const start = Date.now();
        
        try {
            // Store the original end function
            const originalEnd = res.end;
            
            // Override end function to capture response
            res.end = function (chunk?: any, encoding?: any, cb?: any) {
                const duration = Date.now() - start;
                
                // Record metrics
                createCustomMetric(`${operationName}_duration`, duration);
                createCustomMetric(`${operationName}_${res.statusCode < 400 ? 'success' : 'failure'}`, 1, {
                    status: res.statusCode.toString(),
                    method: req.method,
                    path: req.path
                });
                
                // Call original end
                return originalEnd.call(this, chunk, encoding, cb);
            };
            
            next();
        } catch (error) {
            await createCustomMetric(`${operationName}_failure`, 1, {
                reason: (error as Error).message
            });
            next(error);
        }
    };
};