import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository'
import FakeCacheProvider from '@shared/providers/CacheProvider/fakes/FakeCacheProvider'
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'
import CreateAppointmentService from './CreateAppointmentService'

import ListProviderAppointmentsService from './ListProviderAppointmentsService'

let createAppointment: CreateAppointmentService
let fakeAppointmentsRepository: FakeAppointmentsRepository
let listProviderAppointments: ListProviderAppointmentsService
let notificationsRepository: FakeNotificationsRepository
let cacheProvider: FakeCacheProvider

describe('List Provider Appointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    notificationsRepository = new FakeNotificationsRepository()
    cacheProvider = new FakeCacheProvider()

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      notificationsRepository,
      cacheProvider
    )

    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      cacheProvider
    )
  })

  it('should be able to list appointment hours availability from provider', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date('2020-01-01 08:00').getTime()
    })

    const appointmentOne = await createAppointment.execute({
      provider_id: 'mock-provider-id',
      customer_id: 'mock-customer-id',
      date: new Date('2020-01-01 09:00')
    })

    const appointmentTwo = await createAppointment.execute({
      provider_id: 'mock-provider-id',
      customer_id: 'mock-customer-id',
      date: new Date('2020-01-01 10:00')
    })

    const appointments = await listProviderAppointments.execute({
      provider_id: 'mock-provider-id',
      day: 1,
      month: 1,
      year: 2020
    })

    expect(appointments).toEqual([
      appointmentOne,
      appointmentTwo
    ])
  })
})
