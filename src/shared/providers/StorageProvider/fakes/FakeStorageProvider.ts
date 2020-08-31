import IStorageProvider from '../contracts/IStorageProvider'

class FakeStorageProvider implements IStorageProvider {
  private storaged: string[] = []

  public async saveFile(file: string): Promise<string> {
    this.storaged.push(file)
    return file
  }

  public async deleteFile(file: string): Promise<void> {
    const foundIndex = this.storaged.findIndex(savedFile => savedFile === file)
    this.storaged.splice(foundIndex, 1)
  }

}

export default FakeStorageProvider
