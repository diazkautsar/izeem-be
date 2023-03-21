import { Type } from '@sinclair/typebox';
import { ReplySchema } from '../index';

const createUserPersonalInformationSchema = {
    tags: ['User Personal Information'],
    summary: 'create user personal infromation',
    description: 'create user personal infromation',
    body: Type.Object({
        name: Type.String(),
        job_title: Type.String(),
        summary_profile: Type.String(),
        image_url: Type.String(),
        phone: Type.String(),
        email: Type.String(),
        address: Type.String(),
        website: Type.Optional(Type.String()),
    }),
    response: {
        201: Type.Object({
            ...ReplySchema[201].properties,
        }),
    },
};

export default createUserPersonalInformationSchema;
