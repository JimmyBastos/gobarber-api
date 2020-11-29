import 'reflect-metadata'
import 'dotenv/config'
import 'express-async-errors'

import { errors as handleValidationErrors } from 'celebrate'

import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import storageConfig from '@config/storage'
import routes from '@shared/infra/http/routes'
import handleErrors from '@shared/infra/http/middlewares/handleErrors'
import rateLimiter from '@shared/infra/http/middlewares/rateLimiter'

import '@shared/infra/typeorm'
import '@shared/container'

const app = express()

app.use(cors())

app.use(express.json())

app.use(morgan('dev'))

app.use('/files', express.static(storageConfig.tempFolder))

app.use(rateLimiter)

app.use(routes)

app.use(handleValidationErrors({ statusCode: 422 }))

app.use(handleErrors)

export default app
