import { getRepository, Repository } from 'typeorm'
import Appointment from '../entities/Appointment'
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'

class AppointmentsRepository implements IAppointmentRepository {
  private ormRepository: Repository<Appointment>

  constructor () {
    this.ormRepository = getRepository(Appointment)
  }

  public async create ({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      provider_id,
      date
    })

    await this.ormRepository.save(appointment)

    return appointment
  }

  public async findByDate (date: Date): Promise<Appointment | undefined> {
    const foundAppointment = await this.ormRepository.findOne({
      where: { date }
    })

    return foundAppointment || undefined
  }

  public async findAllFromProviderInMonth ({ provider_id, month, year }: IFindAllProviderAppointmentsInMonthDTO): Promise<Appointment[]> {
    const targetMonth = formatDate(new Date(`${year}-${month}`), 'YYYY-MM')

    const appointmentList = this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(dateField => `to_char(${dateField}, 'YYYY-MM') = '${targetMonth}'`)
      }
    })

    return appointmentList
  }
}

export default AppointmentsRepository
