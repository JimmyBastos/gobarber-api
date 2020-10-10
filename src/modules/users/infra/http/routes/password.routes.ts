import { Router } from 'express'

import ForgotenPasswordController from '../controllers/ForgotenPasswordController'
import ForgotenPasswordValidator from '../validators/ForgotenPasswordValidator'

import ResetPasswordController from '../controllers/ResetPasswordController'
import ResetPasswordValidator from '../validators/ResetPasswordValidator'

const passwordRouter = Router()

const forgotenPasswordController = new ForgotenPasswordController()
const forgotenPasswordValidator = new ForgotenPasswordValidator()

const resetPasswordController = new ResetPasswordController()
const resetPasswordValidator = new ResetPasswordValidator()

passwordRouter.post(
  '/forgot',
  forgotenPasswordValidator.create(),
  forgotenPasswordController.create
)

passwordRouter.post(
  '/reset',
  resetPasswordValidator.create(),
  resetPasswordController.create
)

export default passwordRouter
