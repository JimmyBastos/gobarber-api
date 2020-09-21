import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import ResetPasswordService from './ResetPasswordService'
import FakeMailProvider from '@shared/providers/MailProvider/fakes/FakeEmailProvider'
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import AppError from '@shared/errors/AppError'

let resetPassword: ResetPasswordService

let fakeUsersRepository: FakeUsersRepository
let fakeUserTokensRepository: FakeUserTokensRepository

let fakeMailProvider: FakeMailProvider
let fakeHashProvider: FakeHashProvider

describe('Reset User Password', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeMailProvider = new FakeMailProvider()
    fakeHashProvider = new FakeHashProvider()
    fakeUserTokensRepository = new FakeUserTokensRepository()

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
      fakeHashProvider
    )
  })

  it('should be able to reset the password', async () => {
    const generateHash = jest.spyOn(fakeHashProvider, 'generate')

    const user = await fakeUsersRepository.create({
      name: 'Jhon Due',
      email: 'jhondoe@mail.com',
      password: '123456'
    })

    const { token } = await fakeUserTokensRepository.generate(user.id)

    await resetPassword.execute({
      token,
      password: '654321'
    })

    const updatedUser = await fakeUsersRepository.findById(user.id)

    expect(generateHash).toHaveBeenCalledWith('654321')

    expect(
      await fakeHashProvider.compare('654321', updatedUser?.password as string)
    ).toBeTruthy()
  })

  it('should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPassword.execute({
        token: 'non-existing-token',
        password: '654321'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to reset the password with non-existing user', async () => {
    const { token } = await fakeUserTokensRepository.generate('non-existing-user-id')

    await expect(
      resetPassword.execute({
        token,
        password: '654321'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to reset password if the token was generated more than 2 hours ago', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jhon Due',
      email: 'jhondoe@mail.com',
      password: '123456'
    })

    const { token } = await fakeUserTokensRepository.generate(user.id)

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date()
      return customDate.setHours(customDate.getHours() + 2)
    })

    await expect(
      resetPassword.execute({
        token,
        password: '654321'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
