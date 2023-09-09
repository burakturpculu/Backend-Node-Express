import Joi from 'joi'

class AuthValidator {
  public loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
  })

  public validateLogin(data: { email: string; password: string }) {
    return this.loginSchema.validate(data)
  }
}

export default new AuthValidator()
