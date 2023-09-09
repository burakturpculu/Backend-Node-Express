import { Request, Response, NextFunction } from 'express'
import { OkSuccessfulResponse } from 'errors'

import AuthService from './auth.service'
import AuthValidator from './validators/auth.validation'
class AuthController {
  public async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const responseEntity = new OkSuccessfulResponse()
    const { email, password } = req.body
    const { error } = AuthValidator.validateLogin({ email, password })
    if (error) {
      return res.status(400).json(error.details[0].message)
    }
    try {
      responseEntity.data = await AuthService.login({ email, password })
      return res.status(responseEntity.statusCode).json(responseEntity.data)
    } catch (exception: any) {
      return res.status(exception.statusCode).json({ exception })
    }
  }
}

export default new AuthController()
