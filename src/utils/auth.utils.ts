import jwt, { Jwt, JwtPayload } from 'jsonwebtoken'
import UserDTO from '../users/users.dto'
import LoggerUtil from './logger.utils'
class AuthUtil {
  public verifyAccessToken(accessToken: string) {
    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!)
      return decoded
    } catch (error) {
      LoggerUtil.log({
        serviceName: 'verifyAccessToken',
        logLevel: 'error',
        message: error,
      })
      return null
    }
  }
  public isAccessTokenExpired(accessToken: string) {
    const decoded = this.verifyAccessToken(accessToken)
    if (!decoded) {
      return true
    }
    const now = Date.now() / 1000
    if (decoded.exp !== undefined && decoded.exp < now) {
      return true
    }
    return false
  }
  public generateRefreshToken(user: UserDTO) {
    try {
      const secretKey = process.env.REFRESH_TOKEN_SECRET!
      return jwt.sign({ user: user }, secretKey, {
        expiresIn: '2h',
      })
    } catch (error) {
      LoggerUtil.log({
        serviceName: 'generateRefreshToken',
        logLevel: 'error',
        message: error,
      })
    }
  }
  public generateAccessToken(userId: string): string {
    try {
      const secretKey = process.env.ACCESS_TOKEN_SECRET!
      return jwt.sign({ user: userId }, secretKey, {
        expiresIn: '1h',
      })
    } catch (error) {
      LoggerUtil.log({
        serviceName: 'generateAccessToken',
        logLevel: 'error',
        message: error,
      })
      return ''
    }
  }
}

export default new AuthUtil()
