export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Neverpay Protocol API',
      version: '0.1.0',
      description:
        'API for interacting with the Neverpay Protocol. In the ledger of the world, we are the eternal debt.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    tags: [
      {
        name: 'Payments',
        description: 'Operations related to payment deferment',
      },
    ],
  },
  apis: ['./src/api/routes/*.ts'],
};