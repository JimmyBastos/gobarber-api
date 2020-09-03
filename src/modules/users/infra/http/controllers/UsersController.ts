import { Request, Response } from 'express'

import { container } from 'tsyringe'

import CreateUserService from '@modules/users/services/CreateUserService'

class UsersController {
  public async create (request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body

      const createUser = container.resolve(CreateUserService)

      const user = await createUser.execute({
        name,
        email,
        password
      })

      delete user.password

      return response.json(user)
    } catch (error) {
      return response
        .status(422)
        .json({ error: error.message })
    }
  }
}

export default UsersController
