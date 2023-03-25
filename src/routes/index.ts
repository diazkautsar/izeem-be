import { FastifyPluginAsync } from 'fastify';

import { createCVSchema, getUserPersonalInformationSchema } from '../schemas';
import { createCVController, getUserPersonalInformationController } from '../controllers';

const skipOverride = Symbol.for('skip-override');

const BASE_URL = '/user';

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

    instance.route({
        method: 'POST',
        url: BASE_URL,
        schema: createCVSchema,
        handler: createCVController,
    });

    instance.route({
        method: 'GET',
        url: BASE_URL + '/personal-information/:userId',
        schema: getUserPersonalInformationSchema,
        handler: getUserPersonalInformationController,
    });
};

IndexRoutes[skipOverride] = true;
export default IndexRoutes;
