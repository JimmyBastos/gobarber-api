import { container } from 'tsyringe'

import DiskStorageProvider from './implementations/DiskStorageProvider'
import IStorageProvider from './contracts/IStorageProvider'

const mailTemplateProviders = {
  disk: DiskStorageProvider
}

container.registerSingleton<IStorageProvider>(
  'MailTemplateProvider',
  mailTemplateProviders.disk
)
