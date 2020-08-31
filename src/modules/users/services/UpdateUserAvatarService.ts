import path from 'path'
import fs from 'fs'
import { inject, injectable } from 'tsyringe'

import uploadConfig from '@config/upload'
import AppError from '@shared/errors/AppError'

import User from '../infra/typeorm/entities/User'
import IUsersRepository from '../repositories/IUserRepository'

interface IRequest {
  user_id: string
  avatarFilename: string
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository
  ) { }


  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError("Invalid User");

    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
      const userAvatarFilesExists = await fs.promises.stat(userAvatarFilePath)

      if (userAvatarFilesExists) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    user.avatar = avatarFilename

    await this.usersRepository.save(user)

    delete user.password

    return user
  }
}

export default UpdateUserAvatarService
