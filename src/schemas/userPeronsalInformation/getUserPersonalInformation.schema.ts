import { Type } from '@sinclair/typebox';
import { ReplySchema } from '../index';

const getUserPersonalInformationSchema = {
    tags: ['User Personal Information'],
    summary: 'create user personal infromation',
    description: 'create user personal infromation',
    response: {
        200: Type.Object({
            ...ReplySchema[200].properties,
        }),
    },
};

export default getUserPersonalInformationSchema;
