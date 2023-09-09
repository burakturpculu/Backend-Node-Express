import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

class Database {
  private static instance: Database

  private constructor() {
    this.connect()
  }

  private connect() {
    const uri = process.env.MONGO_DB_URI
    if (uri)
      mongoose
        .connect(uri)
        .then(() => {
          console.log('MongoDB connection successful')
        })
        .catch((error) => {
          console.error('Database connection error:', error)
        })
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }
}

export default Database
