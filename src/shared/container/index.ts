import { container } from "tsyringe"

import '@shared/providers'

import '@modules/users/providers'

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository'
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository'

import IUsersRepository from '@modules/users/repositories/IUserRepository'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'

container.registerSingleton<IAppointmentRepository>(
  'AppointmentsRepository',
  AppointmentsRepository
)

container.registerSingleton<IUsersRepository>(
  'UserRepository',
  UsersRepository
)
