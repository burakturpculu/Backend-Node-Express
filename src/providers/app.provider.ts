import DotenvProvider from './dotenv.provider'
import ExpressProvider from './express.provider'

class AppProvider {
  public init(): void {
    DotenvProvider.init()
    ExpressProvider.init()
  }
}

export default new AppProvider()
