import { isEqual } from 'date-fns';
import { EntityRepository, Repository } from 'typeorm'
import Appointment from '../models/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment>{

  public async findByDate(date: Date): Promise<Appointment | null> {
    let foundAppointment = await this.findOne({
      where: { date }
    })

    return foundAppointment || null
  }
}

export default AppointmentsRepository
