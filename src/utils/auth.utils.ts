import jwt, { JwtPayload } from 'jsonwebtoken'
import { InternalServerError, UnAuthorizedClientError } from 'errors'
class AuthUtil {
  public verifyAccessToken(accessToken: string): JwtPayload {
    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET!)
      return decoded as JwtPayload
    } catch (error) {
      throw new UnAuthorizedClientError('verifyAccessToken Error')
    }
  }

  public verifyRefreshToken(refreshToken: string): JwtPayload {
    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET!
      )
      return decoded as JwtPayload
    } catch (error) {
      throw new UnAuthorizedClientError('verifyRefreshToken Error')
    }
  }

  public isAccessTokenExpired(accessToken: string): boolean {
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

  public isRefreshTokenExpired(accessToken: string): boolean {
    const decoded = this.verifyRefreshToken(accessToken)
    if (!decoded) {
      return true
    }
    const now = Date.now() / 1000
    if (decoded.exp !== undefined && decoded.exp < now) {
      return true
    }
    return false
  }

  public generateRefreshToken(userId: string): string {
    try {
      const secretKey = process.env.REFRESH_TOKEN_SECRET!
      return jwt.sign({ userId: userId }, secretKey, {
        expiresIn: '2h',
      })
    } catch (error) {
      throw new InternalServerError('GENERATE_REFRESH_TOKEN_ERROR')
    }
  }
  public generateAccessToken(userId: string): string {
    try {
      const secretKey = process.env.ACCESS_TOKEN_SECRET || ''
      console.log(
        process.env.ACCESS_TOKEN_SECRET,
        'process.env.ACCESS_TOKEN_SECRET'
      )

      return jwt.sign({ userId: userId }, secretKey, {
        expiresIn: '1h',
      })
    } catch (error) {
      throw new InternalServerError('GENERATE_ACCESS_TOKEN_ERROR')
    }
  }
}

export default new AuthUtil()
