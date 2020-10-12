import Redis from 'ioredis'
import { Request, Response, NextFunction } from 'express'

import { RateLimiterRedis } from 'rate-limiter-flexible'
import AppError from '@shared/errors/AppError'

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD
})

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rate-limiter',
  points: 10, // 10 requests
  duration: 1 // per 1 second by IP
})

async function rateLimiter (request: Request, response: Response, next: NextFunction) {
  try {
    await limiter.consume(request.ip)
    return next()
  } catch (error) {
    throw new AppError('Too many requests!', 429)
  }
}

export default rateLimiter
