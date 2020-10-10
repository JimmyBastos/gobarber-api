import path from 'path'

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

    const recoverPasswordTemplate = path.resolve(
      __dirname,
      '../view/recover-password.hbs'
    )

    await this.mailProvider.sendMail({
      subject: '[GoBarber] Recuperação de Senha',
      to: {
        name: user.name,
        email: user.email
      },
      templateData: {
        file: recoverPasswordTemplate,
        varibales: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`
        }
      }
    })
  }
}

export default SendPasswordRecoveryEmailService
