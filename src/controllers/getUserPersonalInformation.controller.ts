import { RouteHandler } from 'fastify';
import { Static } from '@sinclair/typebox';

import { getUserPersonalInformationSchema } from '../schemas';
import { getUserPersonalInformationService } from '../services';

type GetUserPersonalInformationController = RouteHandler<{
    Reply: Static<(typeof getUserPersonalInformationSchema.response)[200]>;
}>;

const getUserPersonalInformation: GetUserPersonalInformationController = async function (request, reply) {
    try {
        const payload = request.params as { userId: number | string };

        const { success, message, statusCode, data } = await getUserPersonalInformationService.bind(this)(payload);

        reply.code(statusCode).send({
            status: success,
            statusCode: statusCode,
            message,
            messageTitle: message,
            data,
        });
    } catch (error) {
        throw error;
    }
};

export default getUserPersonalInformation;
