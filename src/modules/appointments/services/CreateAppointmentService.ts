import { getHours, isBefore, startOfHour } from 'date-fns'
import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'
import Appointment from '../infra/typeorm/entities/Appointment'
import IAppointmentRepository from '../repositories/IAppointmentRepository'

interface IRequest {
  provider_id: string
  customer_id: string
  date: Date
}

@injectable()
class CreateAppointmentService {
  constructor (
    @inject('AppointmentRepository')
    private appointmentsRepository: IAppointmentRepository
  ) { }

  public async execute ({ provider_id, customer_id, date }: IRequest): Promise<Appointment> {
    const currentDate = new Date(Date.now())

    const appointmentDate = startOfHour(date)

    if (isBefore(appointmentDate, currentDate)) {
      throw new AppError('You can\'t create an appointment in a passed date', 422)
    }

    if (customer_id === provider_id) {
      throw new AppError('You can\'t create an appointment with yourself', 422)
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError('You can\'t create an appointment before 8am and after 5pm', 422)
    }

    const foundAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate
    )

    if (foundAppointmentInSameDate) {
      throw new AppError('This appointment is already booked', 422)
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      customer_id,
      date: appointmentDate
    })

    return appointment
  }
}

export default CreateAppointmentService
