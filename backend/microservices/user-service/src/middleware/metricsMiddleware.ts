import { RequestHandler } from 'express'
import promClient from 'prom-client'

const register = new promClient.Registry()

register.setDefaultLabels({
  app: 'user-service' 
})

promClient.collectDefaultMetrics({ register })

const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 2, 5]
})

const httpRequestTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
})

register.registerMetric(httpRequestDuration)
register.registerMetric(httpRequestTotal)

export const metricsMiddleware: RequestHandler = (req, res, next) => {
  const start = Date.now()

  res.on('finish', () => {
    const duration = Date.now() - start
    const route = req.route?.path || req.path
    const method = req.method
    const statusCode = res.statusCode.toString()

    // Record metrics
    httpRequestDuration
      .labels(method, route, statusCode)
      .observe(duration / 1000)
    
    httpRequestTotal
      .labels(method, route, statusCode)
      .inc()
  })

  next()
}

export const getMetrics: RequestHandler = async (req, res) => {
  try {
    res.set('Content-Type', register.contentType)
    res.end(await register.metrics())
  } catch (error) {
    res.status(500).send(error)
  }
}