import { celebrate, Joi, Segments } from 'celebrate'

class ForgotenPasswordValidator {
  public create () {
    return celebrate({
      [Segments.BODY]: {
        email: Joi.string().email().required()
      }
    })
  }
}

export default ForgotenPasswordValidator
