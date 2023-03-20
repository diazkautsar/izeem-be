import { Options } from '@mikro-orm/core';
import * as path from 'path';
import env from '../libs/env';

export default {
    type: 'postgresql',
    host: env('DB_HOST') as string,
    port: env('DB_PORT') as number,
    dbName: env('DB_NAME'),
    user: env('DB_USER'),
    password: env('DB_PASSWORD'),
    entities: [path.resolve(__dirname, '../entities/*.entity.js')],
    entitiesTs: [path.resolve(__dirname, '../entities/*.entity.ts')],
    migrations: {
        path: path.resolve(__dirname, '../database/migrations'),
        pattern: /^\w+\.(ts|js)$/,
    },
} as Options;
