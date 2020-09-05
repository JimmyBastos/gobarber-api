import fs from 'fs'
import handlebars from 'handlebars'

import IMailTemplateProvider from '../contracts/IMailTemplateProvider'
import IMailTemplateParserDTO from '../dtos/IMailTemplateParserDTO'

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse ({ file, varibales }: IMailTemplateParserDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8'
    })

    return handlebars.compile(templateFileContent)(varibales)
  }
}

export default HandlebarsMailTemplateProvider
