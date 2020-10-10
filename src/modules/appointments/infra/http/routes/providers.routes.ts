import { Router } from 'express'

import isAuthenticated from '@modules/users/infra/http/middlewares/isAuthenticated'
import ProvidersController from '../controllers/ProvidersController'

import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController'
import ProviderDayAvailabilityValidator from '../validators/ProviderDayAvailabilityValidator'

import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController'
import ProviderMonthAvailabilityValidator from '../validators/ProviderMonthAvailabilityValidator'

const providersRouter = Router()
const providersController = new ProvidersController()

const providerDayAvailabilityController = new ProviderDayAvailabilityController()
const providerDayAvailabilityValidator = new ProviderDayAvailabilityValidator()

const providerMonthAvailabilityController = new ProviderMonthAvailabilityController()
const providerMonthAvailabilityValidator = new ProviderMonthAvailabilityValidator()

providersRouter.use(isAuthenticated)

providersRouter.get('/', providersController.list)

providersRouter.get(
  '/:provider_id/day-availability',
  providerDayAvailabilityValidator.list(),
  providerDayAvailabilityController.list
)

providersRouter.get(
  '/:provider_id/month-availability',
  providerMonthAvailabilityValidator.list(),
  providerMonthAvailabilityController.list
)

export default providersRouter
