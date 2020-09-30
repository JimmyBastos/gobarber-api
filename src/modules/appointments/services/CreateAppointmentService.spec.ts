import CreateAppointmentService from './CreateAppointmentService'
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import AppError from '@shared/errors/AppError'

let createAppointment: CreateAppointmentService
let appointmentsRepository: FakeAppointmentsRepository

describe('Create Appointment', () => {
  beforeEach(() => {
    appointmentsRepository = new FakeAppointmentsRepository()

    createAppointment = new CreateAppointmentService(
      appointmentsRepository
    )
  })

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      provider_id: 'mock-provider-id',
      customer_id: 'mock-customer-id',
      date: new Date()
    })

    expect(appointment).toHaveProperty('id')
  })

  it('should not be able to create two appointments in the same time', async () => {
    const appointmentDate = new Date('2020-06-01 11:00')

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
})
