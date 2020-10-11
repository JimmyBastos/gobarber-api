import { Router } from 'express'

import isAuthenticated from '@modules/users/infra/http/middlewares/isAuthenticated'
import multer from 'multer'
import storageConfig from '@config/storage'

import UsersController from '../controllers/UsersController'
import UsersValidator from '../validators/UsersValidator'

import UserAvatarController from '../controllers/UserAvatarController'

const usersRouter = Router()
const usersController = new UsersController()
const usersValidator = new UsersValidator()
const userAvatarController = new UserAvatarController()

const upload = multer(storageConfig.config.multer)

usersRouter.post('/', usersValidator.create(), usersController.create)

usersRouter.patch('/avatar', upload.single('avatar'), isAuthenticated, userAvatarController.update)

export default usersRouter
