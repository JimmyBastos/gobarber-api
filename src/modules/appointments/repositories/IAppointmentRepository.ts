import Appointment from '../infra/typeorm/entities/Appointment'
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO'

interface IAppointmentRepository {
  findByDate(date: Date): Promise<Appointment | undefined>
  create(data: ICreateAppointmentDTO): Promise<Appointment>
}

export default IAppointmentRepository
