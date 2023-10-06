import AuthDTO from './auth.dto'
import UserDTO from '../users/users.dto'
import FinderService from '../users/services/finder.service'
import AuthUtil from '../utils/auth.utils'

class AuthService {
  public async login({
    email,
    password,
  }: {
    email: string
    password: string
  }): Promise<AuthDTO> {
    const data: UserDTO = await FinderService.findByEmailAndPassword({
      email,
      password,
    })
    const accessToken = AuthUtil.generateAccessToken(data.id)
    const refreshToken = AuthUtil.generateRefreshToken(data.id)

    const response: AuthDTO = {
      accessToken: accessToken,
      refreshToken: refreshToken,
      id: data.id,
    }

    return response
  }
}

export default new AuthService()
