import { Request, Response } from 'express'

import { parseISO } from 'date-fns'
import { container } from 'tsyringe'

import ListProvidersService from '@modules/appointments/services/ListProvidersService'

class AppointmentsController {
  public async list (request: Request, response: Response): Promise<Response> {
    const { user } = request

    const listProviders = container.resolve(ListProvidersService)

    const providers = await listProviders.execute({
      logged_user_id: user.id
    })

    return response.json(providers)
  }
}

export default AppointmentsController
