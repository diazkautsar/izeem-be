import { FastifyPluginAsync } from 'fastify';

import { createUserPersonalInformationSchema } from '../../schemas';
import { createUserPersonalInformationController } from '../../controllers';

const skipOverride = Symbol.for('skip-override');
const BASE_URL = '/users';

const userPersonalInformationRoutes: FastifyPluginAsync & { [skipOverride]?: boolean } = async (instance) => {
    instance.route({
        method: 'POST',
        url: BASE_URL,
        schema: createUserPersonalInformationSchema,
        handler: createUserPersonalInformationController,
    });
};

userPersonalInformationRoutes[skipOverride] = true;

export default userPersonalInformationRoutes;
