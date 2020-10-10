import { celebrate, Joi, Segments } from 'celebrate'

class ProviderMonthAvailabilityValidator {
  public list () {
    return celebrate({
      [Segments.PARAMS]: {
        provider_id: Joi.string().uuid()
      }
    })
  }
}

export default ProviderMonthAvailabilityValidator
