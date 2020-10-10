import { celebrate, Joi, Segments } from 'celebrate'

class ResetPasswordValidator {
  public create () {
    return celebrate({
      [Segments.BODY]: {
        token: Joi.string().uuid().required(),
        password: Joi.string().required(),
        password_confirmation: Joi.string().required().valid(Joi.ref('password'))
      }
    })
  }
}

export default ResetPasswordValidator
