import { Router } from 'express'

import SessionsController from '../controllers/SessionsController'
import SessionsValidator from '../validators/SessionsValidator'

const sessionsRouter = Router()
const sessionsController = new SessionsController()
const sessionsValidator = new SessionsValidator()

sessionsRouter.post('/', sessionsValidator.create(), sessionsController.create)

export default sessionsRouter
