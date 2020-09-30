import { uuid } from 'uuidv4'

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import { isEqual } from 'date-fns'

class FakeAppointmentsRepository implements IAppointmentRepository {
  private appointments: Appointment[] = []

  public async create ({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment()

    Object.assign(appointment, {
      id: uuid(),
      provider_id,
      date
    })

    this.appointments.push(appointment)

    return appointment
  }

  public async findByDate (date: Date): Promise<Appointment | undefined> {
    const foundAppointment = this.appointments.find(
      appointment => isEqual(appointment.date, date)
    )

    return foundAppointment
  }

  public async findAllFromProviderInMonth ({ provider_id, month, year }: IFindAllProviderAppointmentsInMonthDTO): Promise<Appointment[]> {
    const appointmentList = this.appointments.filter(
      appointment => (
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year
      )
    )

    return appointmentList
  }
}

export default FakeAppointmentsRepository
