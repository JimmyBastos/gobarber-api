import { RedisOptions } from 'ioredis'

interface ICacheConfig {
  driver: 'redis',

  config: {
    redis: RedisOptions
  }
}

const cacheConfig = {
  driver: 'redis',
  config: {
    redis: {
      db: 1,
      host: 'localhost',
      port: 6379,
      password: undefined
    }
  }
} as ICacheConfig

export default cacheConfig
