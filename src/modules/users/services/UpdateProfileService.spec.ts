import AppError from '@shared/errors/AppError'

import UpdateProfileService from './UpdateProfileService'

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let updateProfile: UpdateProfileService

describe('Update Profile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    )
  })

  it('should be able to update user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Due',
      email: 'jhondoe@mail.com',
      password: '123456'
    })

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jhon Trê',
      email: 'jhontre@email.com'
    })

    expect(updatedUser.name).toBe('Jhon Trê')
    expect(updatedUser.email).toBe('jhontre@email.com')
  })

  it('should not be able to update a non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'no-existing-user-id',
        name: 'Jhon Due',
        email: 'jhondoe@mail.com'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to update user password', async () => {
    const generateHash = jest.spyOn(fakeHashProvider, 'generate')

    const user = await fakeUsersRepository.create({
      name: 'Jhon Due',
      email: 'jhondoe@mail.com',
      password: '123456'
    })

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Jhon Due',
      email: 'jhondoe@mail.com',
      password: '654321',
      old_password: '123456'
    })

    expect(generateHash).toHaveBeenCalledWith('654321')

    expect(
      await fakeHashProvider.compare('654321', updatedUser.password as string)
    ).toBeTruthy()
  })

  it('should not be able to update email to a same email from another', async () => {
    await fakeUsersRepository.create({
      name: 'Jhon Due',
      email: 'jhondoe@mail.com',
      password: '123456'
    })

    const user = await fakeUsersRepository.create({
      name: 'Jhon Trê',
      email: 'jhontre@email.com',
      password: '123456'
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jhon Trê',
        email: 'jhondoe@mail.com'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update user password without inform the old one', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Due',
      email: 'jhondoe@mail.com',
      password: '123456'
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jhon Due',
        email: 'jhondoe@mail.com',
        password: '654321'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update user if the old password is wrong', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Due',
      email: 'jhondoe@mail.com',
      password: '123456'
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Jhon Due',
        email: 'jhondoe@mail.com',
        old_password: 'wrong-old-password',
        password: '654321'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
