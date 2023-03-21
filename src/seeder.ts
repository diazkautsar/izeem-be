import * as dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import path from 'path';

import { MikroORM } from '@mikro-orm/core';
import mikroOrm from './config/mikro-orm';

import SeedTableSection from './database/seeders/001_SeedTableSections';
import SeedTableFields from './database/seeders/002_SeedTableFields';

(async () => {
    const orm = await MikroORM.init({
        ...mikroOrm,
        allowGlobalContext: true,
    });

    const functions = [SeedTableSection, SeedTableFields];

    for (const item of functions) {
        try {
            await item(orm);
        } catch (error) {
            console.log('SEED ', item, ' ERROR');
            console.log(error);
        }
    }

    await orm.close();
})();
