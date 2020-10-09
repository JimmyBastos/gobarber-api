import CreateAppointmentService from './CreateAppointmentService'
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import AppError from '@shared/errors/AppError'

import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository'

let createAppointment: CreateAppointmentService
let appointmentsRepository: FakeAppointmentsRepository
let notificationsRepository: FakeNotificationsRepository

describe('Create Appointment', () => {
  beforeEach(() => {
    appointmentsRepository = new FakeAppointmentsRepository()
    notificationsRepository = new FakeNotificationsRepository()

    createAppointment = new CreateAppointmentService(
      appointmentsRepository,
      notificationsRepository
    )
  })

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date('2020-01-01 10:00').getTime()
    })

    const appointment = await createAppointment.execute({
      provider_id: 'mock-provider-id',
      customer_id: 'mock-customer-id',
      date: new Date('2020-01-01 14:00')
    })

    expect(appointment).toHaveProperty('id')
  })

  it('should not be able to create two appointments in the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date('2020-01-01 10:00').getTime()
    })

    const appointmentDate = new Date('2020-01-01 14:00')

    await createAppointment.execute({
      provider_id: 'mock-provider-id',
      customer_id: 'mock-customer-id',
      date: appointmentDate
    })

    await expect(
      createAppointment.execute({
        provider_id: 'mock-provider-id',
        customer_id: 'mock-customer-id',
        date: appointmentDate
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new appointment in a passed date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date('2020-01-01 10:00').getTime()
    })

    await expect(
      createAppointment.execute({
        provider_id: 'mock-provider-id',
        customer_id: 'mock-customer-id',
        date: new Date('2020-01-01 09:00')
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new appointment with same customer and provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date('2020-01-01 10:00').getTime()
    })

    await expect(
      createAppointment.execute({
        provider_id: 'same-provider-id',
        customer_id: 'same-provider-id',
        date: new Date('2020-01-01 14:00')
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date('2020-01-01 10:00').getTime()
    })

    await expect(
      createAppointment.execute({
        provider_id: 'mock-provider-id',
        customer_id: 'mock-customer-id',
        date: new Date('2020-01-02 07:00')
      })
    ).rejects.toBeInstanceOf(AppError)

    await expect(
      createAppointment.execute({
        provider_id: 'mock-provider-id',
        customer_id: 'mock-customer-id',
        date: new Date('2020-01-02 18:00')
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
