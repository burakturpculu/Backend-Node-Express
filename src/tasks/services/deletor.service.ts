import TaskModel from '../tasks.model'

import { SqlCustomError, InternalServerError } from 'errors'
import LoggerUtil from '../../utils/logger.utils'

class DeletorService {
  public async deleteTaskById(id: string): Promise<void> {
    const result = await TaskModel.deleteOne({ _id: id }).catch((error) => {
      throw new SqlCustomError(error)
    })
    if (result.deletedCount !== 1) {
      throw new InternalServerError('TASK_NOT_DELETED')
    }
    LoggerUtil.log({
      serviceName: 'deleteTask',
      logLevel: 'info',
      message: 'Task successfully deleted',
    })
  }
}

export default new DeletorService()
