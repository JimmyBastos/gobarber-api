import ICacheProvider from '../contracts/ICacheProvider'

interface ICacheData {
  [key: string]: any
}

class FakeCacheProvider implements ICacheProvider {
  public cache: ICacheData = {}

  public async save (key: string, value: any): Promise<void> {
    this.cache[key] = value
  }

  public async retrieve<T> (key: string): Promise<T | null> {
    return this.cache[key] ? this.cache[key] as T : null
  }

  public async invalidate (key: string): Promise<void> {
    delete this.cache[key]
  }

  public async invalidatePrefix (prefix: string): Promise<void> {
    Object.keys(this.cache).forEach(key => {
      if (key.startsWith(`${prefix}:`)) {
        delete this.cache[key]
      }
    })
  }
}

export default FakeCacheProvider
