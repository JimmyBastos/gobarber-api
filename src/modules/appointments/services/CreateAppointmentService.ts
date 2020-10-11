import { getHours, isBefore, startOfHour, format as formatDate } from 'date-fns'
import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'
import Appointment from '../infra/typeorm/entities/Appointment'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository'
import ICacheProvider from '@shared/providers/CacheProvider/contracts/ICacheProvider'

interface IRequest {
  provider_id: string
  customer_id: string
  date: Date
}

@injectable()
class CreateAppointmentService {
  constructor (
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
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

    if (foundAppointmentInSameDate && foundAppointmentInSameDate.provider_id === provider_id) {
      throw new AppError('This appointment is already booked', 422)
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      customer_id,
      date: appointmentDate
    })

    const dateFormatted = formatDate(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'")

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para o dia ${dateFormatted}`
    })

    this.cacheProvider.invalidate(
      `provider-appointments:${provider_id}:${formatDate(appointmentDate, 'yyyy-M-d')}`
    )

    return appointment
  }
}

export default CreateAppointmentService
