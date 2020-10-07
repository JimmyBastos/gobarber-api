import { Request, Response } from 'express'

import { parseISO } from 'date-fns'
import { container } from 'tsyringe'

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService'

class ProviderAppointmentsController {
  public async list (request: Request, response: Response): Promise<Response> {
    const { id: provider_id } = request.user
    const { day, month, year } = request.body

    const listProviderAppointments = container.resolve(ListProviderAppointmentsService)

    const appointments = await listProviderAppointments.execute({
      provider_id,
      day,
      month,
      year
    })

    return response.json(appointments)
  }
}

export default ProviderAppointmentsController
