import AppError from '@shared/errors/AppError'
import { promises } from 'fs'

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'

import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let listProviderDayAvailability: ListProviderDayAvailabilityService

describe('List Providers', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()

    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository
    )
  })

  it('should be able to list appointment hours availability from provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 9, 17, 9, 0, 0).getTime()
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'mock-provider-id',
      date: new Date(2020, 9, 17, 11, 0, 0)
    })

    await fakeAppointmentsRepository.create({
      provider_id: 'mock-provider-id',
      date: new Date(2020, 9, 17, 12, 0, 0)
    })

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'mock-provider-id',
      year: 2020,
      month: 10,
      day: 17
    })

    expect(availability).toEqual(expect.arrayContaining([
      { hour: 8, available: false },
      { hour: 10, available: true },
      { hour: 11, available: false },
      { hour: 12, available: false }
    ]))
  })
})
