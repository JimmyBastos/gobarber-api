import { Router } from 'express'
import { parseISO, parse } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import CreateAppointmentService from '../services/CreateAppointmentService'
import AppointmentsRepository from '../repositories/AppointmentsRepository'
import isAuthenticated from '../middlewares/isAuthenticated'

const appointmentsRouter = Router()

appointmentsRouter.use(isAuthenticated)


appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(
    AppointmentsRepository
  )

  const apointments = await appointmentsRepository.find({
    relations: ['provider']
  })

  return response.json(apointments)
})

appointmentsRouter.post('/', async (request, response) => {

  const { provider_id, date } = request.body

  const parsedDate = parseISO(date)

  const createAppoitment = new CreateAppointmentService()

  const appointment = await createAppoitment.execute({
    provider_id,
    date: parsedDate
  })

  return response.json(appointment)

})

export default appointmentsRouter
