import nodemailer, { Transporter } from 'nodemailer'

import IMailProvider from '../contracts/IMailProvider'

class EtherealMailProvider implements IMailProvider {
  private client: Transporter

  constructor () {
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

  async sendMail (to: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      from: '"Equipe GoBarber" <equipe@gobarber.com.br>',
      subject: 'Email de recuperação de senha',
      to,
      text: body
    })

    console.log('Message sent: %s', message.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
  }
}

export default EtherealMailProvider
