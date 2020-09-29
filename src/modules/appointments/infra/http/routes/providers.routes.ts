import { Router } from 'express'

import isAuthenticated from '@modules/users/infra/http/middlewares/isAuthenticated'
import ProvidersController from '../controllers/ProvidersController'

const providersRouter = Router()
const providersController = new ProvidersController()

providersRouter.use(isAuthenticated)

providersRouter.get('/', providersController.list)

export default providersRouter
