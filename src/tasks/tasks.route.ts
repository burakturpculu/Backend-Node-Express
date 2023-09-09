import { Router } from 'express'

import TaskController from '../tasks/tasks.controller'

const router: Router = Router()

router.get('/api/tasks', TaskController.getTask)

router.get('/api/tasks/:id', TaskController.getTaskById)

router.post('/api/tasks', TaskController.saveTask)

router.delete('/api/tasks/:id', TaskController.deleteTaskById)

router.patch('/api/tasks/:id', TaskController.updateTaskByName)

export default router
