import { inject, injectable } from 'tsyringe'

import ICacheProvider from '@shared/providers/CacheProvider/contracts/ICacheProvider'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import User from '@modules/users/infra/typeorm/entities/User'

interface IRequest {
  logged_user_id: string
}

@injectable()
class ListProvidersService {
  constructor (
    @inject('UserRepository')
    private usersRepository: IUsersRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider

  ) { }

  public async execute ({ logged_user_id }: IRequest): Promise<User[]> {
    let providers = await this.cacheProvider.retrieve<User[]>(
      `providers:${logged_user_id}`
    )

    if (!providers) {
      providers = await this.usersRepository.findAllProviders({
        except_user_id: logged_user_id
      })

      await this.cacheProvider.save(
        `providers:${logged_user_id}`,
        providers
      )
    }

    return providers
  }
}

export default ListProvidersService
