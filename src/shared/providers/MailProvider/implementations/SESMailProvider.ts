import nodemailer, { Transporter } from 'nodemailer'

import { injectable, inject } from 'tsyringe'

import aws from 'aws-sdk'

import mailConfig from '@config/mail'

import IMailTemplateProvider from '@shared/providers/MailTemplateProvider/contracts/IMailTemplateProvider'

import IMailProvider from '../contracts/IMailProvider'
import ISendMailDTO from '../dtos/ISendMailDTO'

@injectable()
class SESMailProvider implements IMailProvider {
  private client: Transporter

  constructor (
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_DEFAULT_REGION
      })
    })
  }

  async sendMail ({ to, from, subject, templateData }: ISendMailDTO): Promise<void> {
    const { name, email } = mailConfig.defaults.from

    const template = await this.mailTemplateProvider.parse(templateData)

    await this.client.sendMail({
      subject: subject,
      html: template,
      from: {
        name: from?.name || name,
        address: from?.email || email
      },
      to: {
        name: to.name,
        address: to.email
      }
    })
  }
}

export default SESMailProvider
