import express, { Application, Request, Response } from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { version } from '../package.json' // package.json dosyasındaki version bilgisini alın
const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'REST API DOCUMENTATION',
      version,
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: 'http',
          schema: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  // API dosyalarınızın yollarını burada belirtin
  apis: ['./src/auth/*.ts'], // Örnek olarak, routes dosyanızın yolu
}

const swaggerSpec = swaggerJsdoc(options)

const setupSwagger = (app: Application) => {
  // Swagger UI'ı "/docs" yolunda sunun
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  // Swagger JSON dosyasını "/docs.json" yolunda sunun
  app.get('/docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
}

export default setupSwagger
