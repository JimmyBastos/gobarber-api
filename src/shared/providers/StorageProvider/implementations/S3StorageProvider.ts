import fs from 'fs'
import path from 'path'

import { S3 } from 'aws-sdk'

import IStorageProvider from '../contracts/IStorageProvider'
import storageConfig from '@config/storage'

class S3StorageProvider implements IStorageProvider {
  private client: S3

  public constructor () {
    this.client = new S3({
      region: process.env.AWS_DEFAULT_REGION
    })
  }

  public async saveFile (file: string): Promise<string> {
    const originalPath = path.resolve(storageConfig.tempFolder, file)

    const fileContent = await fs.promises.readFile(originalPath, {
      encoding: 'utf-8'
    })

    await this.client
      .putObject({
        Key: file,
        Bucket: 'gobarberapi',
        ACL: 'public-read',
        Body: fileContent
      })
      .promise()

    return file
  }

  public async deleteFile (file: string): Promise<void> {
    await this.client.deleteObject({
      Key: file,
      Bucket: 'gobarberapi'
    }).promise()
  }
}

export default S3StorageProvider
