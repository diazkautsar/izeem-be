import { Type } from '@sinclair/typebox';

export const BaseReplySchema = Type.Object({
    status: Type.Boolean(),
    statusCode: Type.Number(),
    message: Type.Optional(Type.String()),
    messageTitle: Type.Optional(Type.String()),
    data: Type.Optional(Type.Any()),
});

const schemaBuilder = (status: boolean, statusCode: number, messageTitle?: string) => {
    return {
        ...BaseReplySchema,
        status,
        statusCode,
        messageTitle,
    };
};

export const ReplySchema = {
    200: schemaBuilder(true, 200),
    201: schemaBuilder(true, 201),
    400: schemaBuilder(false, 400),
    401: schemaBuilder(false, 401),
    402: schemaBuilder(false, 402),
    404: schemaBuilder(false, 404),
    422: schemaBuilder(false, 422),
    500: schemaBuilder(false, 500, 'Internal Server Error'),
};

export { default as createCVSchema } from './createCV.schema';
export { default as getUserPersonalInformationSchema } from './getUserPersonalInformation.schema';
