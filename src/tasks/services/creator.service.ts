import TaskModel from '../tasks.model'

import { SqlCustomError } from 'errors'
import LoggerUtil from '../../utils/logger.utils'
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

class CreatorService {
  public async saveTask(name: string): Promise<void> {
    const localTime = dayjs().utcOffset(3).format('DD-MM-YYYY HH:mm:ss')
    const newTask = new TaskModel({
      _id: uuidv4(),
      name,
      created_at: localTime,
    })
    await newTask.save().catch((error) => {
      throw new SqlCustomError(error)
    })
    LoggerUtil.log({
      serviceName: 'saveTask',
      logLevel: 'info',
      message: 'Belge başarıyla kaydedildi',
    })
  }
}

export default new CreatorService()
