import { FastifyPluginAsync } from 'fastify';

const skipOverride = Symbol.for('skip-override');

const IndexRoutes: FastifyPluginAsync & { [skipOverride]?: boolean } = async (instance) => {
    instance.route({
        method: 'GET',
        url: '/',
        schema: {
            querystring: {
                name: { type: 'string' },
                excitement: { type: 'integer' },
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        hello: { type: 'string' },
                    },
                },
            },
        },
        handler: function (request, reply) {
            reply.send({ hello: 'world' });
        },
    });
};

IndexRoutes[skipOverride] = true;
export default IndexRoutes;
