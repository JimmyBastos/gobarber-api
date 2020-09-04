import { container } from 'tsyringe'

import IStorageProvider from './StorageProvider/contracts/IStorageProvider'
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider'

import IMailProvider from './MailProvider/contracts/IMailProvider'
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider'

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider
)
container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider()
)
