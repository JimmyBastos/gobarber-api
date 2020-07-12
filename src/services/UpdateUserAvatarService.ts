import User from '../models/User';
import { getRepository } from 'typeorm';
import uploadConfig from '../config/upload';
import path from 'path';
import fs from 'fs';

interface Request {
  user_id: string
  avatarFilename: string
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const userRepository = getRepository(User)

    const user = await userRepository.findOneOrFail(user_id)

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
      const userAvatarFilesExists = await fs.promises.stat(userAvatarFilePath)

      if (userAvatarFilesExists) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    user.avatar = avatarFilename

    await userRepository.save(user)

    delete user.password

    return user
  }
}

export default UpdateUserAvatarService
