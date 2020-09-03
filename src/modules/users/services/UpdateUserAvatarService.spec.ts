import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import AppError from '@shared/errors/AppError'

import UpdateUserAvatarService from './UpdateUserAvatarService'
import FakeStorageProvider from '@shared/providers/StorageProvider/fakes/FakeStorageProvider'

describe('Update User Avatar', () => {
  it('should be able to update user avatar', async () => {
    const usersRepository = new FakeUsersRepository()
    const storageProvider = new FakeStorageProvider()

    const updateUserAvatar = new UpdateUserAvatarService(
      usersRepository,
      storageProvider
    )

    const user = await usersRepository.create({
      name: 'Jhon Due',
      email: 'jhondoe@mail.com',
      password: '123456'
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg'
    })

    expect(user.avatar).toBe('avatar.jpg')
  })

  it('should not be able to update a non existing user avatar', async () => {
    const usersRepository = new FakeUsersRepository()
    const storageProvider = new FakeStorageProvider()

    const updateUserAvatar = new UpdateUserAvatarService(
      usersRepository,
      storageProvider
    )

    await expect(
      updateUserAvatar.execute({
        user_id: 'non-existing-user',
        avatarFilename: 'avatar.jpg'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should delete old avatar when a new avatar is set', async () => {
    const usersRepository = new FakeUsersRepository()
    const storageProvider = new FakeStorageProvider()

    const deleteFile = jest.spyOn(storageProvider, 'deleteFile')

    const updateUserAvatar = new UpdateUserAvatarService(
      usersRepository,
      storageProvider
    )

    const user = await usersRepository.create({
      name: 'Jhon Due',
      email: 'jhondoe@mail.com',
      password: '123456'
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg'
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg'
    })

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg')
    expect(user.avatar).toBe('avatar2.jpg')
  })
})
