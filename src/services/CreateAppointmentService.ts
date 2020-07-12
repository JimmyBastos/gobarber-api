import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'
import Apointment from '../models/Appointment'
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppError from '../errors/AppError';

interface Request {
  provider_id: string
  date: Date
}

class CreateAppointmentService {
  public async execute({ provider_id, date }: Request): Promise<Apointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)

    const appointmentDate = startOfHour(date)

    let foundAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate
    )

    if (foundAppointmentInSameDate) {
      throw new AppError('This apointment is already booked', 422)
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate
    })

    await appointmentsRepository.save(appointment)

    return appointment
  }
}

export default CreateAppointmentService
