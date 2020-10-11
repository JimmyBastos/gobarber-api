import CreateUserService from './CreateUserService'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import AppError from '@shared/errors/AppError'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import FakeCacheProvider from '@shared/providers/CacheProvider/fakes/FakeCacheProvider'

let usersRepository: FakeUsersRepository
let hashProvider: FakeHashProvider
let createUser: CreateUserService
let cacheProvider: FakeCacheProvider

describe('Create User', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository()
    hashProvider = new FakeHashProvider()
    cacheProvider = new FakeCacheProvider()

    createUser = new CreateUserService(
      usersRepository,
      hashProvider,
      cacheProvider
    )
  })

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Jhon Due',
      email: 'jhondoe@mail.com',
      password: '123456'
    })

    expect(user).toHaveProperty('id')
  })

  it('should not be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'Jhon Due',
      email: 'jhondoe@mail.com',
      password: '123456'
    })

    await expect(
      createUser.execute({
        name: 'Jhon Due',
        email: 'jhondoe@mail.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
