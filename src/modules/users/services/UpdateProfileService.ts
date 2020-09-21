import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import IUsersRepository from '../repositories/IUsersRepository'
import User from '../infra/typeorm/entities/User'
import IHashProvider from '../providers/HashProvider/contracts/IHashProvider'

interface IRequest {
  user_id: string
  name: string
  email: string
  password?: string
  old_password?: string
}

@injectable()
class UpdateUserAvatarService {
  constructor (
    @inject('UserRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) { }

  public async execute ({ user_id, name, email, password, old_password }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('Invalid User', 404)
    }

    const checkEmailExists = await this.usersRepository.findByEmail(email)

    // Verify if the provided email belongs to another user
    if (checkEmailExists && checkEmailExists?.id !== user_id) {
      throw new AppError('Email address already used.', 422)
    }

    Object.assign(user, {
      name,
      email
    })

    if (password) {
      if (!old_password) {
        throw new AppError('To set a new password you must to inform the old password.', 403)
      }

      const oldPasswordMatches = await this.hashProvider.compare(
        old_password,
        user.password
      )

      if (!oldPasswordMatches) {
        throw new AppError('The old password does not match.', 403)
      }

      user.password = await this.hashProvider.generate(password)
    }

    await this.usersRepository.save(user)

    return user
  }
}

export default UpdateUserAvatarService
