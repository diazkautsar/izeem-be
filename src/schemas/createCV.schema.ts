import { Type } from '@sinclair/typebox';
import { ReplySchema } from './index';

const createCVSchema = {
    tags: ['Create CV'],
    summary: 'create CV',
    description: 'create CV',
    body: Type.Object({
        name: Type.String(),
        job_title: Type.String(),
        summary_profile: Type.String(),
        image_url: Type.String(),
        phone: Type.String(),
        email: Type.String(),
        address: Type.String(),
        website: Type.Optional(Type.String()),
        skills: Type.Array(Type.String()),
    }),
    response: {
        201: Type.Object({
            ...ReplySchema[201].properties,
        }),
    },
};

export default createCVSchema;
