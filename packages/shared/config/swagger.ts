import * as path from 'path';
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
import * as dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NodeType',
      version: '1.0.0',
      description: 'Nada.',
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api`,
      },
    ],
    tags: [
      { name: 'Users', description: 'Gerenciamento de usuários' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Informe o token JWT no formato: Bearer <token>',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [path.resolve('packages/AuthModule/src/routes/*.ts')],
};

const specs = swaggerJSDoc(options);

export { swaggerUi, specs };
