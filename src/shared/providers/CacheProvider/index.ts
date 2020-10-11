import { container } from 'tsyringe'

import cacheConfig from '@config/cache'
import ICacheProvider from './contracts/ICacheProvider'
import RedisCacheProvider from './implementations/RedisCacheProvider'

const cacheProviders = {
  redis: RedisCacheProvider
}

container.registerSingleton<ICacheProvider>(
  'CacheProvider',
  cacheProviders[cacheConfig.driver]
)
