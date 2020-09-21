import AppError from '@shared/errors/AppError'

import ShowProfileService from './ShowProfileService'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'

let fakeUsersRepository: FakeUsersRepository
let showProfile: ShowProfileService

describe('Show Profile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()

    showProfile = new ShowProfileService(
      fakeUsersRepository
    )
  })

  it('should be able to show user profile', async () => {
    const { id: user_id } = await fakeUsersRepository.create({
      name: 'Jhon Due',
      email: 'jhondoe@mail.com',
      password: '123456'
    })

    const profile = await showProfile.execute({ user_id })

    expect(profile.name).toBe('Jhon Due')
    expect(profile.email).toBe('jhondoe@mail.com')
  })

  it('should not be able to show a non-existing user profile', async () => {
    await expect(
      showProfile.execute({
        user_id: 'no-existing-user-id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
