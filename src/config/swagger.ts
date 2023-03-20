import { SwaggerOptions } from '@fastify/swagger';

const swaggerOptions: SwaggerOptions = {
    hideUntagged: true,
    swagger: {
        info: {
            title: 'IZEEM TEST - CV CSM',
            description: 'API documentation izeem test',
            version: `${process.env.npm_package_version}`,
            contact: {
                name: 'Diaz Kautsar',
                url: 'https://diazkautsar.com',
                email: 'diazkautsar77@gmail.com',
            },
        },
        externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here',
        },
        host: `localhost:${process.env.PORT}`,
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
    },
};

export default swaggerOptions as SwaggerOptions;
