import AppError from '@shared/errors/AppError'

import ListProvidersService from './ListProvidersService'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'

let fakeUsersRepository: FakeUsersRepository
let listProfile: ListProvidersService

describe('List Providers', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()

    listProfile = new ListProvidersService(
      fakeUsersRepository
    )
  })

  it('should be able to list providers', async () => {
    const loggedUser = await fakeUsersRepository.create({
      name: 'Jhon Due',
      email: 'jhondoe@mail.com',
      password: '123456'
    })

    const providerOne = await fakeUsersRepository.create({
      name: 'Jhon Trê',
      email: 'jhontre@mail.com',
      password: '123456'
    })

    const providerTwo = await fakeUsersRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@mail.com',
      password: '123456'
    })

    const providers = await listProfile.execute({ logged_user_id: loggedUser.id })

    expect(providers).toEqual([
      providerOne,
      providerTwo
    ])
  })
})
