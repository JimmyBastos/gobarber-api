import CreateUserService from './CreateUserService'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import AppError from '@shared/errors/AppError'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'

let usersRepository: FakeUsersRepository
let hashProvider: FakeHashProvider
let createUser: CreateUserService

describe('Create User', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository()
    hashProvider = new FakeHashProvider()

    createUser = new CreateUserService(
      usersRepository,
      hashProvider
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
