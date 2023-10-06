import { Router } from 'express'

import UserController from './users.controller'

const router: Router = Router()

router.post('/api/user/save', UserController.save)

router.get('/api/user/:id', UserController.getUserById)

router.patch('/api/user/:id', UserController.updateByName)

router.delete('/api/user/:id', UserController.deleteByName)

export default router
