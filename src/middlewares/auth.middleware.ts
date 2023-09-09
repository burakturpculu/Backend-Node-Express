import { Request, Response, NextFunction } from 'express'
import AuthUtils from '../utils/auth.utils'

class AuthMiddleware {
  public authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization
      console.log(authHeader, 'authHeader')
      if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header not found' })
      }
      const [type, token] = authHeader.split(' ')
      if (type !== 'Bearer' || !token) {
        return res.status(401).json({ error: 'Invalid authorization header' })
      }
      console.log(token, 'token')

      const expired = AuthUtils.isAccessTokenExpired(token)
      console.log(expired, 'expired')

      if (expired) return res.status(401).json({ error: 'Token Expired' })
      next()
    } catch (error) {
      console.error(error)
      res.status(401).json({ error: 'Invalid token' })
    }
  }
}
export default new AuthMiddleware()
