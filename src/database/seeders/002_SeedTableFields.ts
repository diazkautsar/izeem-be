import { MikroORM } from '@mikro-orm/core';

import Sections from '../../entities/sections.entity';
import Fields from '../../entities/fields.entity';

export default async (ORM: MikroORM) => {
    const entityManager = ORM.em.fork();

    const personal_information_query = entityManager.findOne(Sections, { slug: 'personal_information' });
    const skills_query = entityManager.findOne(Sections, { slug: 'skills' });
    const experience_query = entityManager.findOne(Sections, { slug: 'experience' });
    const education_query = entityManager.findOne(Sections, { slug: 'education' });

    const [personal_information, skills, experience, education] = await Promise.all([
        personal_information_query,
        skills_query,
        experience_query,
        education_query,
    ]);

    const fields = [
        {
            section_id: personal_information?.id,
            name: 'Phone Number',
            slug: 'phone',
            icon_url:
                'https://ik.imagekit.io/6ytqiv4caie2/icons/icons8-ringing-phone-30_0oSnGCXcxB.png?updatedAt=1679355265031',
            show_icon_url: true,
            created_by: 'system',
        },
        {
            section_id: personal_information?.id,
            name: 'Email',
            slug: 'email',
            icon_url:
                'https://ik.imagekit.io/6ytqiv4caie2/icons/icons8-mail-account-30__8In2U3d5.png?updatedAt=1679355265070',
            show_icon_url: true,
            created_by: 'system',
        },
        {
            section_id: personal_information?.id,
            name: 'Address',
            slug: 'address',
            icon_url:
                'https://ik.imagekit.io/6ytqiv4caie2/icons/icons8-home-address-30_ZlYMCYLTF.png?updatedAt=1679355264767',
            show_icon_url: true,
            created_by: 'system',
        },
        {
            section_id: personal_information?.id,
            name: 'Website',
            slug: 'website',
            icon_url:
                'https://ik.imagekit.io/6ytqiv4caie2/icons/icons8-internet-30_iiSlja2ZP.png?updatedAt=1679355264744',
            show_icon_url: true,
            created_by: 'system',
        },
        {
            section_id: skills?.id,
            name: 'Skills',
            slug: 'skills',
            icon_url: null,
            show_icon_url: false,
            created_by: 'system',
        },
        {
            section_id: experience?.id,
            name: 'Position',
            slug: 'position',
            icon_url: null,
            show_icon_url: false,
            created_by: 'system',
        },
        {
            section_id: experience?.id,
            name: 'Start Date',
            slug: 'start_date',
            icon_url: null,
            show_icon_url: false,
            created_by: 'system',
        },
        {
            section_id: experience?.id,
            name: 'End Date',
            slug: 'end_date',
            icon_url: null,
            show_icon_url: false,
            created_by: 'system',
        },
        {
            section_id: experience?.id,
            name: 'Description',
            slug: 'description',
            icon_url: null,
            show_icon_url: false,
            created_by: 'system',
        },
        {
            section_id: education?.id,
            name: 'School Name',
            slug: 'school_name',
            icon_url: null,
            show_icon_url: false,
            created_by: 'system',
        },
        {
            section_id: education?.id,
            name: 'Start Date',
            slug: 'start_date',
            icon_url: null,
            show_icon_url: false,
            created_by: 'system',
        },
        {
            section_id: education?.id,
            name: 'End Date',
            slug: 'end_date',
            icon_url: null,
            show_icon_url: false,
            created_by: 'system',
        },
        {
            section_id: education?.id,
            name: 'Degree',
            slug: 'degree',
            icon_url: null,
            show_icon_url: false,
            created_by: 'system',
        },
        {
            section_id: education?.id,
            name: 'Field of Study',
            slug: 'field',
            icon_url: null,
            show_icon_url: false,
            created_by: 'system',
        },
    ];

    for (const item of fields) {
        if (item.section_id) {
            const field = new Fields();

            field.section_id = item.section_id;
            field.name = item.name;
            field.slug = item.slug;
            field.icon_url = item.icon_url;
            field.show_icon_url = item.show_icon_url;
            field.created_by = 'system';

            await entityManager.persist(field);
            await entityManager.flush();
        }
    }
};
