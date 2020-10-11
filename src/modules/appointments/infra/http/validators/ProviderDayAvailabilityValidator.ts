import { celebrate, Joi, Segments } from 'celebrate'

class ProviderDayAvailabilityValidator {
  public list () {
    return celebrate({
      [Segments.PARAMS]: {
        provider_id: Joi.string().uuid()
      },
      [Segments.QUERY]: {
        day: Joi.number().min(1).max(31).required(),
        month: Joi.number().min(1).max(12).required(),
        year: Joi.number().required()
      }
    })
  }
}

export default ProviderDayAvailabilityValidator
