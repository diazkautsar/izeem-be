import { Type } from '@sinclair/typebox';
import { ReplySchema } from './index';

const getUserPersonalInformationSchema = {
    tags: ['User Personal Information'],
    summary: 'create user personal infromation',
    description: 'create user personal infromation',
    params: Type.Object({
        userId: Type.Number(),
    }),
    response: {
        200: Type.Object({
            ...ReplySchema[200].properties,
        }),
    },
};

export default getUserPersonalInformationSchema;
