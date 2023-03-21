import { MikroORM, Options, RequestContext } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import fp from 'fastify-plugin';

declare module 'fastify' {
    interface FastifyInstance {
        ORM: MikroORM<PostgreSqlDriver>;
    }
}

export default fp(async (fastify, opts: Options) => {
    const mikroOrm = await MikroORM.init({
        ...opts,
        findOneOrFailHandler: (entityName) => {
            return fastify.httpErrors.notFound(`${entityName} is not found`);
        },
        debug: process.env.NODE_ENV === 'development' ? true : false,
    });

    fastify.decorate('ORM', mikroOrm);
    fastify.addHook('preValidation', (_request, _reply, next) => {
        RequestContext.create(mikroOrm.em, next);
    });
    fastify.addHook('onClose', async () => {
        await mikroOrm.close();
    });
});
