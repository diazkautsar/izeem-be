import { FastifyInstance } from 'fastify';

import Sections from '../../entities/sections.entity';
import Users from '../../entities/users.entity';
import UserSections from '../../entities/userSections.entity';
import UserFields from '../../entities/userFields';
import Fields from '../../entities/fields.entity';

import { MPPING_DEFAULT_SLUG_SECTION_WITH_ORDER } from '../../constants/index';

type CreateUserPersonalInformationService = (
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
    }
) => Promise<{ success: boolean; message: string }>;

const createUserPersonalInformationService: CreateUserPersonalInformationService = async function ({
    name,
    job_title,
    summary_profile,
    image_url,
    phone,
    email,
    address,
    website,
}) {
    const em = this.ORM.em.fork();
    await em.begin();

    try {
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

        await em.commit();

        return {
            success: true,
            message: 'Success create user personal information',
        };
    } catch (error) {
        await em.rollback();
        throw error;
    }
};

export default createUserPersonalInformationService;
