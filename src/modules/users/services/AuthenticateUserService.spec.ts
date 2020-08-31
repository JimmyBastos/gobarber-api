import CreateUserService from "./CreateUserService";
import AuthenticateUserService from "./AuthenticateUserService";
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';


describe('Authenticate User', () => {

  it('shold be able to authenticate user', async () => {
    const usersRepository = new FakeUsersRepository()
    const hashProvider = new FakeHashProvider()

    const createUser = new CreateUserService(
      usersRepository,
      hashProvider
    )

    const authenticateUser = new AuthenticateUserService(
      usersRepository,
      hashProvider
    )

    const user = await createUser.execute({
      name: 'Jhon Due',
      email: 'jhondoe@mail.com',
      password: '123456',
    })

    const response = await authenticateUser.execute({
      email: 'jhondoe@mail.com',
      password: '123456'
    })

    expect(response).toHaveProperty('token')
  })


  it('shold be able to authenticate with a non existing user', async () => {
    const usersRepository = new FakeUsersRepository()
    const hashProvider = new FakeHashProvider()

    const authenticateUser = new AuthenticateUserService(
      usersRepository,
      hashProvider
    )

    try {
      await authenticateUser.execute({
        email: 'jhondoe@mail.com',
        password: '123456'
      })
    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })

  it('shold be able to authenticate with wrong password', async () => {
    const usersRepository = new FakeUsersRepository()
    const hashProvider = new FakeHashProvider()

    const createUser = new CreateUserService(
      usersRepository,
      hashProvider
    )

    const authenticateUser = new AuthenticateUserService(
      usersRepository,
      hashProvider
    )

    try {
      await createUser.execute({
        name: 'Jhon Due',
        email: 'jhondoe@mail.com',
        password: '123456',
      })

      await authenticateUser.execute({
        email: 'jhondoe@mail.com',
        password: '654321'
      })

    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })
})
