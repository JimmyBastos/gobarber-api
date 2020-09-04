import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import AppError from '@shared/errors/AppError'
import SendPasswordRecoveryEmailService from './SendPasswordRecoveryEmailService'
import FakeMailProvider from '@shared/providers/MailProvider/fakes/FakeEmailProvider'
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository'

let fakeUsersRepository: FakeUsersRepository
let fakeMailProvider: FakeMailProvider
let fakeUserTokensRepository: FakeUserTokensRepository
let sendRecoveryEmail: SendPasswordRecoveryEmailService

describe('Send Password Recovery Email', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeMailProvider = new FakeMailProvider()
    fakeUserTokensRepository = new FakeUserTokensRepository()

    sendRecoveryEmail = new SendPasswordRecoveryEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository
    )
  })

  it('should be able to recover the password using email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')

    await fakeUsersRepository.create({
      name: 'Jhon Due',
      email: 'jhondoe@mail.com',
      password: '123456'
    })

    await sendRecoveryEmail.execute({
      email: 'jhondoe@mail.com'
    })

    expect(sendMail).toHaveBeenCalled()
  })

  it('should not be able to recover a non existing user password', async () => {
    await expect(
      sendRecoveryEmail.execute({
        email: 'jhondoe@mail.com'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should generate a password recovery token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate')

    const user = await fakeUsersRepository.create({
      name: 'Jhon Due',
      email: 'jhondoe@mail.com',
      password: '123456'
    })

    await sendRecoveryEmail.execute({
      email: 'jhondoe@mail.com'
    })

    expect(generateToken).toHaveBeenCalledWith(user.id)
  })
})
