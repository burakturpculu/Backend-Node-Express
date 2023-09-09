import AuthDTO from './auth.dto'
import UserDTO from '../users/users.dto'
import FinderService from '../users/services/finder.service'
import { IUser } from '../users/users.model'
import AuthUtil from '../utils/auth.utils'

class AuthService {
  public async login({
    email,
    password,
  }: {
    email: string
    password: string
  }): Promise<{ data: AuthDTO }> {
    const data: UserDTO = await FinderService.getUserByEmailAndPassword({
      email,
      password,
    })
    const accessToken = AuthUtil.generateAccessToken(data.id)
    const response = { data: {} as AuthDTO }
    const authDTO: AuthDTO = {
      accessToken: accessToken,
    }
    response.data = authDTO

    return response
  }
}

export default new AuthService()
