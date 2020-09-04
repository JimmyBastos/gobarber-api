import { inject, injectable } from 'tsyringe'
import { differenceInHours } from 'date-fns'

import IUsersRepository from '../repositories/IUsersRepository'
import IMailProvider from '@shared/providers/MailProvider/contracts/IMailProvider'
import IUserTokensRepository from '../repositories/IUserTokensRepository'
import AppError from '@shared/errors/AppError'
import IHashProvider from '../providers/HashProvider/contracts/IHashProvider'

interface IRequest {
  token: string
  password: string
}

@injectable()
class ResetPasswordService {
  constructor (
    @inject('UserRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) { }

  public async execute ({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token)

    if (!userToken) {
      throw new AppError('User token not exists')
    }

    const user = await this.usersRepository.findById(userToken.user_id)

    if (!user) {
      throw new AppError('User does not exists')
    }

    if (differenceInHours(Date.now(), userToken.created_at) >= 2) {
      throw new AppError('Token expired')
    }

    user.password = await this.hashProvider.generate(password)

    this.usersRepository.save(user)
  }
}

export default ResetPasswordService
