import { Router } from 'express'

import isAuthenticated from '@modules/users/infra/http/middlewares/isAuthenticated'

import ProfileController from '../controllers/ProfileController'
import ProfileValidator from '../validators/ProfileValidator'

const profileRouter = Router()
const profileController = new ProfileController()
const profileValidator = new ProfileValidator()

profileRouter.use(isAuthenticated)

profileRouter.get('/', profileController.show)

profileRouter.put('/', profileValidator.update(), profileController.update)

export default profileRouter
