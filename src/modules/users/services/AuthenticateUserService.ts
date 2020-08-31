import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import authConfig from '@config/auth'
import AppError from '@shared/errors/AppError'

import User from '../infra/typeorm/entities/User'
import IUsersRepository from '../repositories/IUserRepository'
import IHashProvider from '../providers/HashProvider/contracts/IHashProvider'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  token: string
  user: User
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) { }

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Incorrect email.', 401)
    }

    const passwordMatched = await this.hashProvider.compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401)
    }

    delete user.password

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: '1d'
    })

    return {
      token,
      user
    }
  }
}

export default AuthenticateUserService
