import { celebrate, Joi, Segments } from 'celebrate'

class ProviderDayAvailabilityValidator {
  public list () {
    return celebrate({
      [Segments.PARAMS]: {
        provider_id: Joi.string().uuid()
      }
    })
  }
}

export default ProviderDayAvailabilityValidator
