import IMailTemplateProvider from '../contracts/IMailTemplateProvider'
import IMailTemplateParserDTO from '../dtos/IMailTemplateParserDTO'

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse (data: IMailTemplateParserDTO): Promise<string> {
    return data.file
  }
}

export default FakeMailTemplateProvider
