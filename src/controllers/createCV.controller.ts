import { RouteHandler } from 'fastify';
import { Static } from '@sinclair/typebox';

import { createCVSchema } from '../schemas';
import { createCVService } from '../services';

type CreateCVController = RouteHandler<{
    Reply: Static<(typeof createCVSchema.response)[201]>;
    Body: Static<typeof createCVSchema.body>;
}>;

const createCVController: CreateCVController = async function (reqeust, reply) {
    try {
        const { success, message, statusCode } = await createCVService.bind(this)(reqeust.body);

        reply.code(statusCode).send({
            status: success,
            statusCode: statusCode,
            message,
            messageTitle: message,
            data: null,
        });
    } catch (error) {
        throw error;
    }
};

export default createCVController;
