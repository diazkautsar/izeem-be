import { RouteHandler } from 'fastify';
import { Static } from '@sinclair/typebox';

import { createUserPersonalInformationSchema } from '../../schemas';
import { createUserPersonalInformationService } from '../../services';

type CreateUserPersonalInformationController = RouteHandler<{
    Reply: Static<(typeof createUserPersonalInformationSchema.response)[201]>;
    Body: Static<typeof createUserPersonalInformationSchema.body>;
}>;

const createUserPersonalInformationController: CreateUserPersonalInformationController = async function (
    request,
    reply
) {
    try {
        const { message, success, statusCode } = await createUserPersonalInformationService.bind(this)(request.body);

        reply.code(statusCode).send({
            status: success,
            statusCode,
            message,
            messageTitle: message,
            data: null,
        });
    } catch (error) {
        throw error;
    }
};

export default createUserPersonalInformationController;
