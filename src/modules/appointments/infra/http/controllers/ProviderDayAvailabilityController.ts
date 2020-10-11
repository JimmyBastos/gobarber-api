import { Request, Response } from 'express'

import { container } from 'tsyringe'

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService'

class ProviderDayAvailabilityController {
  public async list (request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params

    const { day, month, year } = request.query

    const listProvideDayAvailability = container.resolve(ListProviderDayAvailabilityService)

    const appointment = await listProvideDayAvailability.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year)
    })

    return response.json(appointment)
  }
}

export default ProviderDayAvailabilityController
