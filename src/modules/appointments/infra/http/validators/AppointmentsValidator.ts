import { celebrate, Joi, Segments } from 'celebrate'

class AppointmentValidator {
  public create () {
    return celebrate({
      [Segments.BODY]: {
        provider_id: Joi.string().uuid().required(),
        date: Joi.date().required()
      }
    })
  }
}

export default AppointmentValidator
