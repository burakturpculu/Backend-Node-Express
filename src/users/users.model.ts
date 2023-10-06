import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IUser extends Document {
  id: string
  password: string
  email: string
  name: string
  surname: string
  created_at: string
  updated_at: string
  deleted_at: string
}

const userSchema: Schema = new Schema({
  _id: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  surname: { type: String, required: true },
  name: { type: String, required: true },
  created_at: { type: String, required: true },
  updated_at: { type: String, required: false },
  deleted_at: { type: String, required: false },
})

const UserModel: Model<IUser> = mongoose.model<IUser>('users', userSchema)

export default UserModel
