import { Request, Response } from 'express'

import { classToClass } from 'class-transformer'

import { container } from 'tsyringe'

import UpdateProfileService from '@modules/users/services/UpdateProfileService'
import ShowProfileService from '@modules/users/services/ShowProfileService'

class ProfileController {
  public async show (request: Request, response: Response): Promise<Response> {
    const showProfile = container.resolve(ShowProfileService)

    const user = await showProfile.execute({ user_id: request.user.id })

    return response.json(user)
  }

  public async update (request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { name, email, password, old_password } = request.body

    const createUser = container.resolve(UpdateProfileService)

    const user = await createUser.execute({
      user_id,
      name,
      email,
      password,
      old_password
    })

    return response.json(
      classToClass(user)
    )
  }
}

export default ProfileController
