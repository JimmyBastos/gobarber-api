import Appointment from '../infra/typeorm/entities/Appointment'
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO'
import IFindAllProviderAppointmentsInMonthDTO from '../dtos/IFindAllProviderAppointmentsInMonthDTO'

interface IAppointmentRepository {
  findByDate(date: Date): Promise<Appointment | undefined>
  create(data: ICreateAppointmentDTO): Promise<Appointment>
  findAllFromProviderInMonth(filters: IFindAllProviderAppointmentsInMonthDTO): Promise<Appointment[]>
}

export default IAppointmentRepository
