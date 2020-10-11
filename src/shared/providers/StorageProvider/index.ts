import storageConfig from '@config/storage'
import { container } from 'tsyringe'

import IStorageProvider from './contracts/IStorageProvider'

import DiskStorageProvider from './implementations/DiskStorageProvider'
import S3StorageProvider from './implementations/S3StorageProvider'

const storageProvider = {
  s3: S3StorageProvider,
  disk: DiskStorageProvider
}

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  storageProvider[storageConfig.driver]
)
