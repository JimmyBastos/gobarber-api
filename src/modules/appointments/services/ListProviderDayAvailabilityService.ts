import { inject, injectable } from 'tsyringe'

import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

import { getHours, isAfter } from 'date-fns'

interface IRequest {
  provider_id: string,
  day: number,
  month: number,
  year: number
}

type IResponse = Array<{
  hour: number,
  available: boolean
}>

@injectable()
class ListProviderDayAvailabilityService {
  constructor (
     @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) { }

  public async execute ({ provider_id, day, month, year }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllFromProviderInDay({
      provider_id,
      day,
      month,
      year
    })

    const currentDate = new Date(Date.now())

    const firstHourInDay = 8

    const workingHoursInDay = Array.from(Array(10), (_, hour) => hour + firstHourInDay) // 08h - 18h

    const avaliability = workingHoursInDay.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour
      )

      const requestedDate = new Date(year, month - 1, day, hour)

      return {
        hour,
        available: !hasAppointmentInHour && isAfter(requestedDate, currentDate)
      }
    })

    return avaliability
  }
}

export default ListProviderDayAvailabilityService
