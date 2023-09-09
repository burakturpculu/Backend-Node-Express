import TaskModel, { ITask } from '../tasks.model'

import { SqlCustomError, NotFoundClientError } from 'errors'
import TaskDTO from '../tasks.dto'
class FinderService {
  public async getTask(): Promise<TaskDTO[]> {
    const tasks: ITask[] | null = await TaskModel.find().catch((error) => {
      throw new SqlCustomError(error)
    })
    if (!tasks) return []
    const taskDTO = tasks.map((task) => ({
      id: task._id,
      name: task.name,
      created_at: task.created_at || '',
      deleted_at: task.deleted_at || '',
      updated_at: task.updated_at || '',
    }))

    return taskDTO
  }
  public async getTaskById(id: string): Promise<TaskDTO> {
    const task: ITask | null = await TaskModel.findById({ _id: id }).catch(
      (error) => {
        throw new SqlCustomError(error)
      }
    )
    if (!task) throw new NotFoundClientError('TASK_NOT_FOUND')
    const taskDTO = {
      id: task._id,
      name: task.name,
      created_at: task.created_at || '',
      deleted_at: task.deleted_at || '',
      updated_at: task.updated_at || '',
    }

    return taskDTO
  }
}

export default new FinderService()
