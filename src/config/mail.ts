
interface IMailConfig {
  driver: 'ses' | 'ethereal'
  defaults: {
    from: {
      name: string
      email: string
    }
  }
}

const mailConfig = {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      name: 'Equipe GoBarber',
      email: 'gobarber@brance.com.br'
    }
  }
} as IMailConfig

export default mailConfig
