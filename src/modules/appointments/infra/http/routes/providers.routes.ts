import { Router } from 'express'

import isAuthenticated from '@modules/users/infra/http/middlewares/isAuthenticated'
import ProvidersController from '../controllers/ProvidersController'
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController'
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController'

const providersRouter = Router()
const providersController = new ProvidersController()

const providerDayAvailabilityController = new ProviderDayAvailabilityController()
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController()

providersRouter.use(isAuthenticated)

providersRouter.get('/', providersController.list)
providersRouter.get('/:provider_id/day-availability', providerDayAvailabilityController.list)
providersRouter.get('/:provider_id/month-availability', providerMonthAvailabilityController.list)

export default providersRouter
