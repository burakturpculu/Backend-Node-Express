import { Router } from 'express'

import AuthController from './auth.controller'
const router: Router = Router()

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     tags:
 *       - Auth
 *     description: Login Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       '200':
 *         description: Successful response
 */

router.post('/api/login', AuthController.login)

// router.post('/login', AuthMiddleware.authMiddleware, AuthController.login)

export default router
