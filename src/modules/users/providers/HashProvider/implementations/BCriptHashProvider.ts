import IHashProvider from '../contracts/IHashProvider'
import { hash, compare } from 'bcryptjs'

class BCryptHashProvider implements IHashProvider {
  public async generate (payload: string): Promise<string> {
    return hash(payload, 8)
  }

  public async compare (payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed)
  }
}

export default BCryptHashProvider
