import { Request, Response } from 'express'

import { container } from 'tsyringe'

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'

class AppointmentsController {
  public async create (request: Request, response: Response): Promise<Response> {
    const { id: customer_id } = request.user
    const { provider_id, date } = request.body

    const createAppoitment = container.resolve(CreateAppointmentService)

    const appointment = await createAppoitment.execute({
      provider_id,
      customer_id,
      date
    })

    return response.json(appointment)
  }
}

export default AppointmentsController
