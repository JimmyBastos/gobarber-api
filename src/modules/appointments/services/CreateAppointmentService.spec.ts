import CreateAppointmentService from "./CreateAppointmentService";
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';


describe('Create Appointment', () => {

  it('shold be able to create a new appointment', async () => {
    const createAppointment = new CreateAppointmentService(
      new FakeAppointmentsRepository()
    )

    const appointment = await createAppointment.execute({
      provider_id: '1',
      date: new Date()
    })

    expect(appointment).toHaveProperty('id')

  })

  it('shold not be able to create two appointments in the same time', async () => {
    const createAppointment = new CreateAppointmentService(
      new FakeAppointmentsRepository()
    )

    const appointmentDate = new Date('2020-06-01 11:00')

    try {
      await createAppointment.execute({
        provider_id: '1',
        date: appointmentDate
      })

      await createAppointment.execute({
        provider_id: '1',
        date: appointmentDate
      })

    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }

  })
})
