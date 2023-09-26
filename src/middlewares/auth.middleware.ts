import { Request, Response, NextFunction } from 'express'
import AuthUtils from '../utils/auth.utils'

class AuthMiddleware {
  public async authMiddleware(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.headers.authorization?.split('Bearer ')[1]
    const refreshToken = req.headers.refreshtoken as string
    try {
      if (accessToken) {
        const accesTokenExpired = AuthUtils.isAccessTokenExpired(accessToken)
        if (accesTokenExpired) {
          if (!refreshToken) {
            return res
              .status(401)
              .json({ error: 'AccessToken expired, RefreshToken missing' })
          }
          const refreshTokenExpired =
            AuthUtils.isRefreshTokenExpired(refreshToken)
          if (refreshTokenExpired) {
            return res.status(401).json({ error: 'RefreshToken expired' })
          }
          const refreshTokenData = AuthUtils.verifyRefreshToken(refreshToken)
          req.userId = refreshTokenData.userId
        } else {
          const accessTokenData = AuthUtils.verifyAccessToken(accessToken)
          req.userId = accessTokenData.userId
        }
      } else {
        return res.status(401).json({ error: 'AccesToken missing' })
      }
      next()
    } catch (error) {
      return res.status(401).json({ error: 'Authentication error' })
    }
  }
}

export default new AuthMiddleware()
