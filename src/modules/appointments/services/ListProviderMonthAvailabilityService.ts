import { inject, injectable } from 'tsyringe'

import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

import User from '@modules/users/infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'
import { getDate, getDaysInMonth, isAfter } from 'date-fns'

interface IRequest {
  provider_id: string,
  month: number,
  year: number
}

type IResponse = Array<{
  day: number,
  available: boolean
}>

@injectable()
class ListProviderMonthAvailabilityService {
  constructor (
     @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) { }

  public async execute ({ provider_id, month, year }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllFromProviderInMonth({
      provider_id,
      month,
      year
    })

    const numberOfDaysInMonth = getDaysInMonth(new Date(`${year}-${month}`))

    const eachDayInMonth = Array.from(Array(numberOfDaysInMonth), (_, i) => i + 1)

    const availablility = eachDayInMonth.map(day => {
      const appointmentsInDay = appointments.filter(
        appointment => getDate(appointment.date) === day
      )

      return {
        day,
        available: appointmentsInDay.length < 10
      }
    })

    return availablility
  }
}

export default ListProviderMonthAvailabilityService
