import CreateUserService from "./CreateUserService";
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';


describe('Create User', () => {

  it('shold be able to create a new user', async () => {
    const usersRepository = new FakeUsersRepository()
    const hashProvider = new FakeHashProvider()

    const createUser = new CreateUserService(
      usersRepository,
      hashProvider
    )


    const user = await createUser.execute({
      name: 'Jhon Due',
      email: 'jhon@mail.com',
      password: '123456',
    })

    expect(user).toHaveProperty('id')
  })

  it('shold not be able to create a new user with same email from another', async () => {
    const usersRepository = new FakeUsersRepository()
    const hashProvider = new FakeHashProvider()

    const createUser = new CreateUserService(
      usersRepository,
      hashProvider
    )

    try {
      await createUser.execute({
        name: 'Jhon Due',
        email: 'jhon@mail.com',
        password: '123456',
      })

      await createUser.execute({
        name: 'Jhon Due',
        email: 'jhon@mail.com',
        password: '123456',
      })

    } catch (error) {
      expect(error).toBeInstanceOf(AppError)
    }
  })
})
