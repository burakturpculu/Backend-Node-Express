import dotenv from 'dotenv'

class DotenvProvider {
  public init(): void {
    dotenv.config()
  }
}

export default new DotenvProvider()
