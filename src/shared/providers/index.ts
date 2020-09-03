import { container } from 'tsyringe'

import IStorageProvider from './StorageProvider/contracts/IStorageProvider'
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider'

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider
)
