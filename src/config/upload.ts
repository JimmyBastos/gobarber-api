import multer from 'multer'
import path from 'path'
import crypto from 'crypto'

const uploadDirectory = path.resolve(__dirname, '../../tmp')

const uploadConfig = {
  directory: uploadDirectory,
  storage: multer.diskStorage({
    destination: uploadDirectory,
    filename (request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex')
      const fileName = `${fileHash}-${file.originalname}`

      return callback(null, fileName)
    }
  })
}

export default uploadConfig
