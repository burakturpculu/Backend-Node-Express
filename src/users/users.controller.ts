import { Request, Response, NextFunction } from 'express'
import { OkSuccessfulResponse } from 'errors'
import finderService from './services/finder.service'
import CreatorService from './services/creator.service'
import UpdatorService from './services/updator.service'
import DeleteService from './services/deletor.service'

class TaskController {
  public async getUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const responseEntity = new OkSuccessfulResponse()
    try {
      // const { accessToken } = req.header
      const { id } = req.params
      console.log('iddd', id)
      responseEntity.data = await finderService.findById({ id })
      return res.status(responseEntity.statusCode).json(responseEntity.data)
    } catch (exception: any) {
      return res.status(exception.statusCode).json({ exception })
    }
  }
  public async updateByName(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const responseEntity = new OkSuccessfulResponse()
    try {
      const { id } = req.params
      const { name } = req.body
      responseEntity.data = await UpdatorService.updateByName({ id, name })
      return res.status(responseEntity.statusCode).json(responseEntity.data)
    } catch (exception: any) {
      return res.status(exception.statusCode).json({ exception })
    }
  }
  public async deleteByName(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const responseEntity = new OkSuccessfulResponse()
    try {
      const { id } = req.params
      const { name } = req.body
      responseEntity.data = await DeleteService.deleteById({ id })
      return res.status(responseEntity.statusCode).json(responseEntity.data)
    } catch (exception: any) {
      return res.status(exception.statusCode).json({ exception })
    }
  }
  public async save(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const responseEntity = new OkSuccessfulResponse()
    try {
      const { name, email, password, surname } = req.body
      responseEntity.data = await CreatorService.save({
        name,
        email,
        password,
        surname,
      })
      return res.status(responseEntity.statusCode).json(responseEntity.data)
    } catch (exception: any) {
      return res.status(exception.statusCode).json({ exception })
    }
  }
}

export default new TaskController()
