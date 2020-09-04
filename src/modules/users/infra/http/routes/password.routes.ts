import { Router } from 'express'

import ForgotenPasswordController from '../controllers/ForgotenPasswordController'
import ResetPasswordController from '../controllers/ResetPasswordController'

const passwordRouter = Router()

const forgotenPasswordController = new ForgotenPasswordController()

const resetPasswordController = new ResetPasswordController()

passwordRouter.post('/forgot', forgotenPasswordController.create)

passwordRouter.post('/reset', resetPasswordController.create)

export default passwordRouter
