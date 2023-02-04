import { Application } from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options= {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'E-commerce API',
        description: 'e-commerce API',
        version: '1.0.0',
      },
      components: {
        securitySchemes: {
          authsecurity: {
            type: 'http',
            scheme: 'bearer',
            in: 'header',
            bearerFormat: 'JWT'
          }
        }
      },
         security: [
        {
          authsecurity: []
        }
      ],
    },
    // looks for configuration in specified directories
    apis: ['./src/routes/*.ts'],   
  }
  const swaggerSpec = swaggerJsdoc(options)
function swaggerDocs(app: Application) {
  // Swagger Page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  // Documentation in JSON format
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
}
export default swaggerDocs 