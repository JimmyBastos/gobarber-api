import { celebrate, Joi, Segments } from 'celebrate'

class ProfileValidator {
  public update () {
    return celebrate({
      [Segments.BODY]: {
        name: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string(),

        old_password: Joi.when('password', {
          is: Joi.exist(),
          then: Joi.string().required(),
          otherwise: Joi.any()
        }),

        password_confirmation: Joi.when('password', {
          is: Joi.exist(),
          then: Joi.string().required(),
          otherwise: Joi.any()
        }).valid(Joi.ref('password'))
      }
    })
  }
}

export default ProfileValidator
