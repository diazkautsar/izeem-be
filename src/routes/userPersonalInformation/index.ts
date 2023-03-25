import { FastifyPluginAsync } from 'fastify';

import { createUserPersonalInformationSchema, getUserPersonalInformationSchema } from '../../schemas';
import { createUserPersonalInformationController, getUserPersonalInformationController } from '../../controllers';

const skipOverride = Symbol.for('skip-override');
const BASE_URL = '/users';

const userPersonalInformationRoutes: FastifyPluginAsync & { [skipOverride]?: boolean } = async (instance) => {
    instance.route({
        method: 'POST',
        url: BASE_URL,
        schema: createUserPersonalInformationSchema,
        handler: createUserPersonalInformationController,
    });

    instance.route({
        method: 'GET',
        url: '/user/:userId',
        schema: getUserPersonalInformationSchema,
        handler: getUserPersonalInformationController,
    });
};

userPersonalInformationRoutes[skipOverride] = true;

export default userPersonalInformationRoutes;
