import { celebrate, Joi, Segments } from 'celebrate'

class ProviderAppointmentsValidator {
  public list () {
    return celebrate({
      [Segments.QUERY]: {
        day: Joi.number().min(1).max(31).required(),
        month: Joi.number().min(1).max(12).required(),
        year: Joi.number().required()
      }
    })
  }
}

export default ProviderAppointmentsValidator
