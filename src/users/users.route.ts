import { Router } from 'express'

import HealthController from '../controllers/HealthController'

const router: Router = Router()

router.get('/health', HealthController.health)

export default router
