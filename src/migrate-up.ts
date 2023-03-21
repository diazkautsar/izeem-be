import * as dotenv from 'dotenv';
dotenv.config();

import { MikroORM } from '@mikro-orm/core';
import mikroOrm from './config/mikro-orm';

(async () => {
    const orm = await MikroORM.init(mikroOrm);

    const migrator = orm.getMigrator();
    await migrator.up();

    await orm.close(true);
})();
