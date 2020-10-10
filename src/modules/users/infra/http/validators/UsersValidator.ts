import { celebrate, Joi, Segments } from 'celebrate'

class UsersValidator {
  public create () {
    return celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
      }
    })
  }
}

export default UsersValidator
