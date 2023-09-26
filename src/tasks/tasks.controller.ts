import { Request, Response, NextFunction } from 'express'
import { OkSuccessfulResponse } from 'errors'
import FinderService from './services/finder.service'
import CreatorService from './services/creator.service'
import TaskValidator from './validators/task.validation'
import DeletorService from './services/deletor.service'
import updatorService from './services/updator.service'

class TaskController {
  public async getTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const responseEntity = new OkSuccessfulResponse()
    try {
      // const userId = req.userId
      responseEntity.data = await FinderService.getTask()
      return res.status(responseEntity.statusCode).json(responseEntity.data)
    } catch (exception: any) {
      return res.status(exception.statusCode).json({ exception })
    }
  }
  public async getTaskById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const responseEntity = new OkSuccessfulResponse()
    try {
      const { id } = req.params
      responseEntity.data = await FinderService.getTaskById(id)
      return res.status(responseEntity.statusCode).json(responseEntity.data)
    } catch (exception: any) {
      return res.status(exception.statusCode).json({ exception })
    }
  }

  public async saveTask(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const responseEntity = new OkSuccessfulResponse()
    try {
      const { name } = req.body
      const { error } = TaskValidator.validateName({ name })
      if (error) {
        return res.status(400).json(error.details[0].message)
      }

      responseEntity.data = await CreatorService.saveTask(name)
      return res.status(responseEntity.statusCode).json(responseEntity.data)
    } catch (exception: any) {
      return res.status(exception.statusCode).json({ exception })
    }
  }

  public async deleteTaskById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const responseEntity = new OkSuccessfulResponse()
    try {
      const { id } = req.params
      const { error } = TaskValidator.validateId({ id })
      if (error) {
        return res.status(400).json(error.details[0].message)
      }
      responseEntity.data = await DeletorService.deleteTaskById(id)
      return res.status(responseEntity.statusCode).json(responseEntity.data)
    } catch (exception: any) {
      return res.status(exception.statusCode).json({ exception })
    }
  }
  public async updateTaskByName(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const responseEntity = new OkSuccessfulResponse()
    try {
      const { id } = req.params
      const { name } = req.body
      const { error } = TaskValidator.validateName({ name })
      if (error) {
        return res.status(400).json(error.details[0].message)
      }
      responseEntity.data = await updatorService.updateTaskByName({ id, name })
      return res.status(responseEntity.statusCode).json(responseEntity.data)
    } catch (exception: any) {
      return res.status(exception.statusCode).json({ exception })
    }
  }
}

export default new TaskController()
