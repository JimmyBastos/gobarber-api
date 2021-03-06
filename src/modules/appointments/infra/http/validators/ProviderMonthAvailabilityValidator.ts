import { celebrate, Joi, Segments } from 'celebrate'

class ProviderMonthAvailabilityValidator {
  public list () {
    return celebrate({
      [Segments.PARAMS]: {
        provider_id: Joi.string().uuid()
      },
      [Segments.QUERY]: {
        month: Joi.number().min(1).max(12).required(),
        year: Joi.number().required()
      }
    })
  }
}

export default ProviderMonthAvailabilityValidator
