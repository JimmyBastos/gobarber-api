import 'reflect-metadata'
import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import uploadConfig from '@config/upload'
import routes from '@shared/infra/http/routes'
import handleErrors from '@shared/infra/http/middlewares/handleErrors'

import '@shared/infra/typeorm'
import '@shared/container'

const app = express()

app.use(cors())
app.use(express.json())

app.use(routes)

app.use(handleErrors)

app.use('/files', express.static(uploadConfig.directory))

export default app
