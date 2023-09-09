import Joi from 'joi'

class TaskValidator {
  public loginSchema = Joi.object({
    name: Joi.string().required(),
  })

  public validateName(data: { name: string }) {
    return this.loginSchema.validate(data)
  }
  public validateId(data: { id: string }) {
    return this.loginSchema.validate(data)
  }
}

export default new TaskValidator()
