import { inject, injectable } from 'tsyringe'

import IUsersRepository from '../repositories/IUsersRepository'
import AppError from '@shared/errors/AppError'
import IMailProvider from '@shared/providers/MailProvider/contracts/IMailProvider'
import IUserTokensRepository from '../repositories/IUserTokensRepository'

interface IRequest {
  email: string
}

@injectable()
class SendPasswordRecoveryEmailService {
  constructor (
    @inject('UserRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository
  ) { }

  public async execute ({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('User does not exist.')
    }

    const { token } = await this.userTokensRepository.generate(user.id)

    await this.mailProvider.sendMail(
      email,
      `Sua solicitação de recuperação de senha foi recebida ${token}`
    )
  }
}

export default SendPasswordRecoveryEmailService
