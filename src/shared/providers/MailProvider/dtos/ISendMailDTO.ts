import IMailTemplateParserDTO from '@shared/providers/MailTemplateProvider/dtos/IMailTemplateParserDTO'

interface IMailContact {
  name: string
  email: string
}

interface ISendMailDTO {
  to: IMailContact
  from?: IMailContact
  subject: string
  templateData: IMailTemplateParserDTO
}

export default ISendMailDTO
