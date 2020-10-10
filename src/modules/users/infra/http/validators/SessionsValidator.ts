import { celebrate, Joi, Segments } from 'celebrate'

class SessionsValidator {
  public create () {
    return celebrate({
      [Segments.BODY]: {
        email: Joi.string().email().required(),
        password: Joi.string().required()
      }
    })
  }
}

export default SessionsValidator
