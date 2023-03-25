import { FastifyInstance } from 'fastify';

import Sections from '../entities/sections.entity';
import Users from '../entities/users.entity';
import UserSections from '../entities/userSections.entity';
import UserFields from '../entities/userFields.entity';
import Fields from '../entities/fields.entity';

import {
    MPPING_DEFAULT_SLUG_SECTION_WITH_ORDER,
    SLUG_PERSONAL_INFORMATION,
    MAPPING_DEFAULT_ORDER_USER_FIELD_PERSONAL_INFORMATION,
    SLUG_FIELD_SKILL,
} from '../constants/index';

type CreateCVService = (
    this: FastifyInstance,
    payload: {
        name: string;
        job_title: string;
        summary_profile: string;
        image_url: string;
        phone: string;
        email: string;
        address: string;
        website?: string;
        skills: string[];
    }
) => Promise<{ success: boolean; message: string; statusCode: number }>;

const createCVService: CreateCVService = async function ({
    name,
    job_title,
    summary_profile,
    image_url,
    phone,
    email,
    address,
    website,
    skills,
}) {
    const em = this.ORM.em.fork();
    await em.begin();

    try {
        const existUser = await em.findOne(Users, { name });
        if (existUser) {
            await em.commit();
            return {
                message: 'User already exist',
                success: false,
                statusCode: 400,
            };
        }

        const user = new Users();
        user.name = name;
        user.job_title = job_title;
        user.summary_profile = summary_profile;
        user.image_url = image_url;
        user.created_by = 'system';
        await em.persistAndFlush(user);

        const sections = await em.find(Sections, {});
        for (const item of sections) {
            const userSection = new UserSections();
            const order = MPPING_DEFAULT_SLUG_SECTION_WITH_ORDER[item.slug];

            userSection.order = order;
            userSection.user_id = user.id;
            userSection.section_id = item.id;
            userSection.created_by = 'system';

            await em.persistAndFlush(userSection);
        }

        const fields = await em.find(Fields, {
            slug: {
                $in: SLUG_PERSONAL_INFORMATION,
            },
        });

        for (const field of fields) {
            const bodyReq = { website, phone, email, address };
            const userField = new UserFields();
            userField.user_id = user.id;
            userField.field_id = field.id;
            userField.order = MAPPING_DEFAULT_ORDER_USER_FIELD_PERSONAL_INFORMATION[field.slug];
            userField.value = bodyReq[field.slug] ?? null;
            userField.created_by = 'system';

            await em.persistAndFlush(userField);
        }

        const fieldSkill = await em.findOne(Fields, { slug: SLUG_FIELD_SKILL });
        if (fieldSkill) {
            for (let i = 0; i < skills.length; i++) {
                const userField = new UserFields();
                userField.user_id = user.id;
                userField.field_id = fieldSkill.id;
                userField.order = i + 1;
                userField.value = skills[i];
                userField.created_by = 'system';

                await em.persistAndFlush(userField);
            }
        }

        await em.commit();

        return {
            success: true,
            message: 'Success create user personal information',
            statusCode: 201,
        };
    } catch (error) {
        console.log(error);
        await em.rollback();
        throw error;
    }
};

export default createCVService;
