import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ITask extends Document {
  id: string
  name: string
  created_at: string
  deleted_at: string
  updated_at: string
}

const taskSchema: Schema = new Schema({
  _id: { type: String },
  name: { type: String, required: true },
  created_at: { type: String, default: null },
  deleted_at: { type: String, default: null },
  updated_at: { type: String, default: null },
})

const TaskModel: Model<ITask> = mongoose.model<ITask>('tasks', taskSchema)

export default TaskModel
