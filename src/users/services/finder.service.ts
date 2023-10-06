import UserModel, { IUser } from '../users.model'
import UserDTO from '../users.dto'

import { SqlCustomError, NotFoundClientError } from 'errors'
class FinderService {
  public async findByEmailAndPassword({
    email,
    password,
  }: {
    email: string
    password: string
  }): Promise<UserDTO> {
    const user: IUser | null = await UserModel.findOne({
      email,
      password,
    }).catch((error) => {
      throw new SqlCustomError(error)
    })

    if (!user) throw new NotFoundClientError({ message: 'User Not found' })

    const userDTO: UserDTO = {
      id: user._id,
      email: user.email,
      name: user.name,
      surname: user.surname,
    }

    return userDTO
  }

  public async findById({ id }: { id: string }): Promise<UserDTO> {
    const user: IUser | null = await UserModel.findOne({
      _id: id,
    }).catch((error) => {
      throw new SqlCustomError(error)
    })

    console.log(user, 'user')

    if (!user) throw new NotFoundClientError({ message: 'User Not found' })

    const userDTO: UserDTO = {
      id: user._id,
      email: user.email,
      name: user.name,
      surname: user.surname,
    }

    return userDTO
  }
}

export default new FinderService()
