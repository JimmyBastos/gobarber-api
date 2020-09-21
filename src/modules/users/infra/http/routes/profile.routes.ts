import { Router } from 'express'

import isAuthenticated from '@modules/users/infra/http/middlewares/isAuthenticated'

import ProfileController from '../controllers/ProfileController'

const profileRouter = Router()
const profileController = new ProfileController()

profileRouter.use(isAuthenticated)

profileRouter.get('/', profileController.show)

profileRouter.put('/', profileController.update)

export default profileRouter
