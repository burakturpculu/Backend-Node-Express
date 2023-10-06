import UserModel from '../users.model'

import { SqlCustomError, InternalServerError } from 'errors'
import LoggerUtil from '../../utils/logger.utils'

class DeletorService {
  public async deleteById({ id }: { id: string }): Promise<void> {
    const result = await UserModel.deleteOne({ _id: id }).catch((error) => {
      throw new SqlCustomError(error)
    })
    if (result.deletedCount !== 1) {
      throw new InternalServerError('TASK_NOT_DELETED')
    }
    LoggerUtil.log({
      serviceName: 'deleteUser',
      logLevel: 'info',
      message: 'User successfully deleted',
    })
  }
}

export default new DeletorService()
