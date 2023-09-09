import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ITask extends Document {
  id: string
  name: string
  created_at: Date
  deleted_at: Date
  updated_at: Date
}

const taskSchema: Schema = new Schema({
  _id: { type: String },
  name: { type: String, required: true },
  created_at: { type: Date, default: null },
  deleted_at: { type: Date, default: null },
  updated_at: { type: Date, default: null },
})

const TaskModel: Model<ITask> = mongoose.model<ITask>('tasks', taskSchema)

export default TaskModel
