import { getRepository, Raw, Repository } from 'typeorm'
import Appointment from '../entities/Appointment'
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import IFindAllProviderAppointmentsInMonthDTO from '@modules/appointments/dtos/IFindAllProviderAppointmentsInMonthDTO'
import { format as formatDate } from 'date-fns'
import IFindAllProviderAppointmentsInDayDTO from '@modules/appointments/dtos/IFindAllProviderAppointmentsInDayDTO'

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>

  constructor () {
    this.ormRepository = getRepository(Appointment)
  }

  public async create ({ provider_id, customer_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      provider_id,
      customer_id,
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
    const targetMonth = formatDate(new Date(`${year}-${month}`), 'yyyy-MM')

    const appointmentList = this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(dateField => `to_char(${dateField}, 'yyyy-MM') = '${targetMonth}'`)
      }
    })

    return appointmentList
  }

  public async findAllFromProviderInDay ({ provider_id, day, month, year }: IFindAllProviderAppointmentsInDayDTO): Promise<Appointment[]> {
    const appointmentList = this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(dateField => `(${dateField})::DATE = '${year}-${month}-${day}'::DATE`)
      }
    })

    return appointmentList
  }
}

export default AppointmentsRepository
