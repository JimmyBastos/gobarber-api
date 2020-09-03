import { Request, Response } from 'express'

import { container } from 'tsyringe'

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'

class SessionsController {
  public async create (request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body

      const authenticateUser = container.resolve(AuthenticateUserService)

      const { token, user } = await authenticateUser.execute({
        email,
        password
      })

      return response.json({
        token,
        user
      })
    } catch (error) {
      return response
        .status(error.statusCode)
        .json({ error: error.message })
    }
  }
}

export default SessionsController
