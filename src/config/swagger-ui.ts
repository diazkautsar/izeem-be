import { FastifySwaggerUiOptions } from '@fastify/swagger-ui';

const swaggerUiOptions: FastifySwaggerUiOptions = {
    routePrefix: '/documentation',
    uiConfig: {
        docExpansion: 'full',
        deepLinking: false,
    },
    uiHooks: {
        onRequest: function (request, reply, next) {
            next();
        },
        preHandler: function (request, reply, next) {
            next();
        },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => {
        return swaggerObject;
    },
    transformSpecificationClone: true,
};

export default swaggerUiOptions as FastifySwaggerUiOptions;
