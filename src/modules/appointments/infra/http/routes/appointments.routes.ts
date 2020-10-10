import { Router } from 'express'

import isAuthenticated from '@modules/users/infra/http/middlewares/isAuthenticated'
import AppointmentsController from '../controllers/AppointmentsController'
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController'
import AppointmentValidator from '../validators/AppointmentsValidator'

const appointmentsRouter = Router()
const appointmentsController = new AppointmentsController()
const appointmentsValidator = new AppointmentValidator()
const providerAppointmentsController = new ProviderAppointmentsController()

appointmentsRouter.use(isAuthenticated)

appointmentsRouter.post('/', appointmentsValidator.create(), appointmentsController.create)
appointmentsRouter.get('/me', providerAppointmentsController.list)

export default appointmentsRouter
