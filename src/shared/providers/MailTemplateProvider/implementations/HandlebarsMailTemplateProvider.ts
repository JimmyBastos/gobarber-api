import handlebars from 'handlebars'

import IMailTemplateProvider from '../contracts/IMailTemplateProvider'
import IMailTemplateParserDTO from '../dtos/IMailTemplateParserDTO'

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse ({ template, varibales }: IMailTemplateParserDTO): Promise<string> {
    return handlebars.compile(template)(varibales)
  }
}

export default HandlebarsMailTemplateProvider
