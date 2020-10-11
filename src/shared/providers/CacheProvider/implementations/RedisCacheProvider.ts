import cacheConfig from '@config/cache'
import Redis, { Redis as RedisClient } from 'ioredis'

import ICacheProvider from '../contracts/ICacheProvider'

class RedisCacheProvider implements ICacheProvider {
  public client: RedisClient

  constructor () {
    this.client = new Redis(
      cacheConfig.config.redis
    )
  }

  public async save (key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value))
  }

  public async retrieve<T> (key: string): Promise<T | null> {
    const savedData = await this.client.get(key)

    return savedData ? JSON.parse(savedData) as T : null
  }

  public async invalidate (key: string): Promise<void> {
    await this.client.del(key)
  }

  public async invalidatePrefix (prefix: string): Promise<void> {
    const keys = await this.client.keys(`${prefix}:*`)

    const pipeline = this.client.pipeline()

    keys.forEach(key => {
      pipeline.del(key)
    })

    pipeline.exec()
  }
}

export default RedisCacheProvider
