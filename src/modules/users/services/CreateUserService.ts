import { inject, injectable } from 'tsyringe'
import { hash } from 'bcryptjs'

import AppError from '@shared/errors/AppError'

import User from '../infra/typeorm/entities/User'
import IUsersRepository from '../repositories/IUserRepository'
import IHashProvider from '../providers/HashProvider/contracts/IHashProvider'

interface IRequest {
  name: string
  email: string
  password: string
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) { }

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email)

    if (checkUserExists) {
      throw new AppError('Email address already used.', 422)
    }

    const hashedPassword = await this.hashProvider.generate(password)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword
    })

    return user
  }
}

export default CreateUserService
