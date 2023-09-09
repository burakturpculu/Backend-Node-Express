import AppProvider from './providers/app.provider'
import mongodb from './databases/mongodb'

const init = (): void => {
  mongodb.getInstance()
  AppProvider.init()
}

init()
