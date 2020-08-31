import path from 'path'
import fs from 'fs'
import { inject, injectable } from 'tsyringe'

import uploadConfig from '@config/upload'
import AppError from '@shared/errors/AppError'

import IStorageProvider from '@shared/providers/StorageProvider/contracts/IStorageProvider'
import IUsersRepository from '../repositories/IUserRepository'
import User from '../infra/typeorm/entities/User'

interface IRequest {
  user_id: string
  avatarFilename: string
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) { }


  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError("Invalid User");

    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar)
    }

    user.avatar = await this.storageProvider.saveFile(avatarFilename)

    await this.usersRepository.save(user)

    delete user.password

    return user
  }
}

export default UpdateUserAvatarService
