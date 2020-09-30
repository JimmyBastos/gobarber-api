import AppError from '@shared/errors/AppError'
import { promises } from 'fs'

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository'

import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let listProviderMonthAvailability: ListProviderMonthAvailabilityService

describe('List Providers', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()

    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository
    )
  })

  it('should be able to list the month availability from provider', async () => {
    const workingHours = Array.from(Array(10), (_, hour) => hour + 8) // 08h - 18h

    await fakeAppointmentsRepository.create({
      provider_id: 'mock-provider-id',
      customer_id: 'mock-customer-id',
      date: new Date(2020, 9, 17, 8, 0, 0)
    })

    await Promise.all(
      workingHours.map(
        async hour => {
          await fakeAppointmentsRepository.create({
            provider_id: 'mock-provider-id',
            customer_id: 'mock-customer-id',
            date: new Date(2020, 9, 18, hour, 0, 0)
          })
        }
      )
    )

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'mock-provider-id',
      year: 2020,
      month: 10
    })

    expect(availability).toEqual(expect.arrayContaining([
      { day: 17, available: true },
      { day: 18, available: false },
      { day: 19, available: true }
    ]))
  })
})
