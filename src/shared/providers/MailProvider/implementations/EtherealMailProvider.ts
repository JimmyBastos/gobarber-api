import nodemailer, { Transporter } from 'nodemailer'

import IMailProvider from '../contracts/IMailProvider'
import ISendMailDTO from '../dtos/ISendMailDTO'
import IMailTemplateProvider from '@shared/providers/MailTemplateProvider/contracts/IMailTemplateProvider'
import { injectable, inject } from 'tsyringe'

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter

  constructor (
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider
  ) {
    nodemailer.createTestAccount().then(account => {
      this.client = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      })
    })
  }

  async sendMail ({ to, from, subject, templateData }: ISendMailDTO): Promise<void> {
    const template = this.mailTemplateProvider.parse(templateData)

    const message = await this.client.sendMail({
      subject: subject,
      html: await template,
      from: {
        name: from?.name || 'Equipe GoBarber',
        address: from?.email || 'contato@gobarber.com.br'
      },
      to: {
        name: to.name,
        address: to.email
      }
    })

    console.log('Message sent: %s', message.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
  }
}

export default EtherealMailProvider
