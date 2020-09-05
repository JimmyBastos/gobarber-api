import CreateUserService from './CreateUserService'
import AuthenticateUserService from './AuthenticateUserService'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import AppError from '@shared/errors/AppError'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'

let usersRepository: FakeUsersRepository
let hashProvider: FakeHashProvider
let createUser: CreateUserService
let authenticateUser: AuthenticateUserService

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository()
    hashProvider = new FakeHashProvider()

    createUser = new CreateUserService(
      usersRepository,
      hashProvider
    )

    authenticateUser = new AuthenticateUserService(
      usersRepository,
      hashProvider
    )
  })

  it('should be able to authenticate user', async () => {
    await createUser.execute({
      name: 'Jhon Due',
      email: 'jhondoe@mail.com',
      password: '123456'
    })

    const response = await authenticateUser.execute({
      email: 'jhondoe@mail.com',
      password: '123456'
    })

    expect(response).toHaveProperty('token')
  })

  it('should be able to authenticate with a non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'jhondoe@mail.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to authenticate with wrong password', async () => {
    await createUser.execute({
      name: 'Jhon Due',
      email: 'jhondoe@mail.com',
      password: '123456'
    })

    await expect(
      authenticateUser.execute({
        email: 'jhondoe@mail.com',
        password: '654321'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
