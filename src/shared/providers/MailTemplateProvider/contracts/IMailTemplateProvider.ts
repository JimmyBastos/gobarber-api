import IMailTemplateParserDTO from '../dtos/IMailTemplateParserDTO'

interface IMailTemplateProvider {
  parse(data: IMailTemplateParserDTO): Promise<string>
}

export default IMailTemplateProvider
