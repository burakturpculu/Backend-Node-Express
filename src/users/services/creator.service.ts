import UserModel, { IUser } from '../users.model'
import UserDTO from '../users.dto'
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import LoggerUtil from '../../utils/logger.utils'

import { SqlCustomError } from 'errors'

dayjs.extend(utc)
dayjs.extend(timezone)

class CreatorService {
  public async save({
    surname,
    name,
    email,
    password,
  }: {
    surname: string
    name: string
    email: string
    password: string
  }): Promise<void> {
    const localTime = dayjs().utcOffset(3).format('DD-MM-YYYY HH:mm:ss')
    const newUser = new UserModel({
      _id: uuidv4(),
      email: email,
      surname: surname,
      password: password,
      name: name,
      created_at: localTime,
    })
    await newUser.save().catch((error) => {
      throw new SqlCustomError(error)
    })

    LoggerUtil.log({
      serviceName: 'save',
      logLevel: 'info',
      message: 'User başarıyla kaydedildi',
    })
  }
}

export default new CreatorService()
