import Appointment from '../infra/typeorm/entities/Appointment'
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO'
import IFindAllProviderAppointmentsInMonthDTO from '../dtos/IFindAllProviderAppointmentsInMonthDTO'
import IFindAllProviderAppointmentsInDayDTO from '../dtos/IFindAllProviderAppointmentsInDayDTO'

interface IAppointmentsRepository {
  findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>
  create(data: ICreateAppointmentDTO): Promise<Appointment>
  findAllFromProviderInMonth(filters: IFindAllProviderAppointmentsInMonthDTO): Promise<Appointment[]>
  findAllFromProviderInDay(filters: IFindAllProviderAppointmentsInDayDTO): Promise<Appointment[]>
}

export default IAppointmentsRepository
