import { uuid } from 'uuidv4'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import { isEqual, getMonth, getYear, getDate } from 'date-fns'
import IFindAllProviderAppointmentsInMonthDTO from '@modules/appointments/dtos/IFindAllProviderAppointmentsInMonthDTO'
import IFindAllProviderAppointmentsInDayDTO from '@modules/appointments/dtos/IFindAllProviderAppointmentsInDayDTO'

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = []

  public async create ({ provider_id, customer_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment()

    Object.assign(appointment, {
      id: uuid(),
      provider_id,
      customer_id,
      date
    })

    this.appointments.push(appointment)

    return appointment
  }

  public async findByDate (date: Date, provider_id: string): Promise<Appointment | undefined> {
    const foundAppointment = this.appointments.find(
      appointment => appointment.provider_id === provider_id && isEqual(appointment.date, date)
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

  public async findAllFromProviderInDay ({ provider_id, day, month, year }: IFindAllProviderAppointmentsInDayDTO): Promise<Appointment[]> {
    const appointmentList = this.appointments.filter(
      appointment => (
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year &&
        getDate(appointment.date) === day
      )
    )

    return appointmentList
  }
}

export default FakeAppointmentsRepository
