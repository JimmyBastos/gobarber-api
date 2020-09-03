import { Request, Response } from 'express'

import { container } from 'tsyringe'

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'

class UserAvatarController {
  public async update (request: Request, response: Response): Promise<Response> {
    try {
      const updateUserAvatar = container.resolve(UpdateUserAvatarService)

      const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename
      })

      return response.json(user)
    } catch (error) {
      return response
        .status(error.statusCode)
        .json({ error: error.message })
    }
  }
}

export default UserAvatarController
