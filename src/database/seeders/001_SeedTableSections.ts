import { MikroORM } from '@mikro-orm/core';

import Sections from '../../entities/sections.entity';

export default async (ORM: MikroORM) => {
    const sections = [
        {
            name: 'Personal Information',
            slug: 'personal_information',
            created_by: 'system',
        },
        {
            name: 'Profile',
            slug: 'profile',
            created_by: 'system',
        },
        {
            name: 'Skills',
            slug: 'skills',
            created_by: 'system',
        },
        {
            name: 'Experience',
            slug: 'experience',
            created_by: 'system',
        },
        {
            name: 'Education',
            slug: 'education',
            created_by: 'system',
        },
    ];

    for (const item of sections) {
        const section = new Sections();

        section.name = item.name;
        section.slug = item.slug;
        section.created_by = item.created_by;

        const entityManager = ORM.em.fork();
        await entityManager.persist(section);
        await entityManager.flush();
    }
};
