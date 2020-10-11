import { container } from 'tsyringe'

import mailConfig from '@config/mail'

import EtherealMailProvider from './implementations/EtherealMailProvider'
import SESMailProvider from './implementations/SESMailProvider'
import IMailProvider from './contracts/IMailProvider'

const mailProviders = {
  ses: container.resolve(SESMailProvider),
  ethereal: container.resolve(EtherealMailProvider)
}

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailProviders[mailConfig.driver]
)
