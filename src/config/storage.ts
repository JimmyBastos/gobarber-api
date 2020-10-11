import multer, { StorageEngine } from 'multer'
import path from 'path'
import crypto from 'crypto'

const tempFolder = path.resolve(__dirname, '../../tmp')

interface IStorageConfig {
  driver: 's3' | 'disk',
  tempFolder: string,
  uploadsFolder: string,
  config: {
    multer: {
      storage: StorageEngine
    }
  }
}

const storageConfig = {
  driver: process.env.STORAGE_DRIVER,

  tempFolder: tempFolder,

  uploadsFolder: path.resolve(tempFolder, 'uploads'),

  config: {
    multer: {
      storage: multer.diskStorage({
        destination: tempFolder,
        filename (request, file, callback) {
          const fileHash = crypto.randomBytes(10).toString('hex')
          const fileName = `${fileHash}-${file.originalname}`

          return callback(null, fileName)
        }
      })
    }
  }
} as IStorageConfig

export default storageConfig
