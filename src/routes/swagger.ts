import swaggerjsdoc from 'swagger-jsdoc';
import envs from '../config/env';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Brain Cards API documentation',
      version: '1.0.0',
      description: 'API documentation for Brain Cards',
    },

    servers: [{ url: `${envs.base_url}/` }],
  },

  apis: ['./src/routes/*.ts'],
};

export const swaggerSpecs = swaggerjsdoc(options);
