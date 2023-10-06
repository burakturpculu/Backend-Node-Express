import express, { Application } from 'express'
import authRouter from '../auth/auth.route'
import userRoute from '../users/users.route'
import setupSwagger from '../swagger'
import cors from 'cors'
import cookieParser from 'cookie-parser' // Cookie-parser middleware ekleniyor
import bodyParser from 'body-parser'

class ExpressProvider {
  private express: Application

  constructor() {
    this.express = express()
    this.bodyParser()
    this.useCookieParser()
    this.useJson()
    this.useCors()
    this.useRoutes()
  }

  public init(): void {
    const port: number = this.getPort()
    this.listen(port)
  }

  private useJson(): void {
    this.express.use(express.json())
  }
  private bodyParser(): void {
    this.express.use(bodyParser.json())
  }
  private useRoutes(): void {
    this.express.use(authRouter)
    this.express.use(userRoute)
  }
  private useCors(): void {
    const corsOptions = {
      origin: '*', // Tüm kaynaklara izin vermek
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // İzin verilen HTTP yöntemleri
      allowedHeaders: ['Content-Type', 'Authorization', 'RefreshToken'], // İzin verilen başlıklar
      exposedHeaders: 'Authorization', // Client tarafına gönderilen başlıklar
      credentials: true,
    }
    this.express.use(cors(corsOptions))
  }
  private getPort(): number {
    return parseInt(process.env.PORT || '3000')
  }
  private useCookieParser(): void {
    this.express.use(cookieParser()) // Cookie-parser middleware önce eklenmelidir.
  }

  private listen(port: number): void {
    this.express.listen(port, () => {
      setupSwagger(this.express)
      console.log(
        '\x1b[33m%s\x1b[0m',
        `Server :: Running @ 'http://localhost:${port}'`
      )
    })
  }
}

export default new ExpressProvider()
