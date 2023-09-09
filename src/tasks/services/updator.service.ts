import TaskModel from '../tasks.model'

import { SqlCustomError, NotFoundClientError } from 'errors'
import LoggerUtil from '../../utils/logger.utils'
import dayjs from 'dayjs'

class UpdatorService {
  public async updateTaskByName({
    id,
    name,
  }: {
    id: string
    name: string
  }): Promise<void> {
    const localTime = dayjs().utcOffset(3).format('DD-MM-YYYY HH:mm:ss')
    const task = await TaskModel.findByIdAndUpdate(
      id,
      { name, updated_at: localTime },
      { new: true }
    ).catch((error) => {
      throw new SqlCustomError(error)
    })
    if (!task) throw new NotFoundClientError('TASK_NOT_FOUND')

    LoggerUtil.log({
      serviceName: 'updateTaskName',
      logLevel: 'info',
      message: 'Belge başarıyla güncellendi',
    })
  }
}

export default new UpdatorService()
