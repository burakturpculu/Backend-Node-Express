import { Request, Response, NextFunction } from 'express'
import { OkSuccessfulResponse } from 'errors'
import finderService from './services/finder.service'
class TaskController {
  public async getUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const responseEntity = new OkSuccessfulResponse()
    try {
      const { accessToken } = req.header

      responseEntity.data = await finderService.getUserById({ id })
      return res.status(responseEntity.statusCode).json(responseEntity.data)
    } catch (exception: any) {
      return res.status(exception.statusCode).json({ exception })
    }
  }
}

export default new TaskController()
