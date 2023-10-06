import UserModel, { IUser } from '../users.model'
import UserDTO from '../users.dto'
import LoggerUtil from '../../utils/logger.utils'

import {
  SqlCustomError,
  NotFoundClientError,
  InternalServerError,
} from 'errors'
import dayjs from 'dayjs'
class UpdatorService {
  public async updateByName({
    id,
    name,
  }: {
    id: string
    name: string
  }): Promise<void> {
    const localTime = dayjs().utcOffset(3).format('DD-MM-YYYY HH:mm:ss')
    const user = await UserModel.findByIdAndUpdate(
      id,
      { name, updated_at: localTime },
      { new: true }
    ).catch((error) => {
      throw new SqlCustomError(error)
    })
    if (!user) throw new InternalServerError('USER_NOT_UPDATED')

    LoggerUtil.log({
      serviceName: 'updateByName',
      logLevel: 'info',
      message: 'User başarıyla güncellendi',
    })
  }
}

export default new UpdatorService()
