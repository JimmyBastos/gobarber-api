import { container } from 'tsyringe'

import HandlebarsMailTemplateProvider from './implementations/HandlebarsMailTemplateProvider'
import IMailTemplateProvider from './contracts/IMailTemplateProvider'

const mailTemplateProviders = {
  handelbars: HandlebarsMailTemplateProvider
}

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  mailTemplateProviders.handelbars
)
