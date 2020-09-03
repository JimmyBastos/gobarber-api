import CreateAppointmentService from './CreateAppointmentService'
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import AppError from '@shared/errors/AppError'

describe('Create Appointment', () => {
  it('should be able to create a new appointment', async () => {
    const createAppointment = new CreateAppointmentService(
      new FakeAppointmentsRepository()
    )

    const appointment = await createAppointment.execute({
      provider_id: '1',
      date: new Date()
    })

    expect(appointment).toHaveProperty('id')
  })

  it('should not be able to create two appointments in the same time', async () => {
    const createAppointment = new CreateAppointmentService(
      new FakeAppointmentsRepository()
    )

    const appointmentDate = new Date('2020-06-01 11:00')

    await createAppointment.execute({
      provider_id: '1',
      date: appointmentDate
    })

    await expect(
      createAppointment.execute({
        provider_id: '1',
        date: appointmentDate
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
