import Appointment from '../infra/typeorm/entities/Appointment'
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO'
import IFindAllProviderAppointmentsInMonthDTO from '../dtos/IFindAllProviderAppointmentsInMonthDTO'
import IFindAllProviderAppointmentsInDayDTO from '../dtos/IFindAllProviderAppointmentsInDayDTO'

interface IAppointmentRepository {
  findByDate(date: Date): Promise<Appointment | undefined>
  create(data: ICreateAppointmentDTO): Promise<Appointment>
  findAllFromProviderInMonth(filters: IFindAllProviderAppointmentsInMonthDTO): Promise<Appointment[]>
  findAllFromProviderInDay(filters: IFindAllProviderAppointmentsInDayDTO): Promise<Appointment[]>
}

export default IAppointmentRepository
