import { Router } from 'express'

import TaskController from '../tasks/tasks.controller'

import AuthMiddleware from '../middlewares/auth.middleware'

const router: Router = Router()

router.get('/api/tasks', AuthMiddleware.authMiddleware, TaskController.getTask)

router.get('/api/tasks/:id', TaskController.getTaskById)

router.post('/api/tasks', TaskController.saveTask)

router.delete('/api/tasks/:id', TaskController.deleteTaskById)

router.patch('/api/tasks/:id', TaskController.updateTaskByName)

export default router
