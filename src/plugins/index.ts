import fastifyBlipp from 'fastify-blipp';
import fastifyCors from '@fastify/cors';
import fastifyPlugin from 'fastify-plugin';
import fastifySensible from '@fastify/sensible';
import fastifyHelmet from '@fastify/helmet';

import MikroORM from './mikro-orm';

import swager from '@fastify/swagger';
import swagerUi from '@fastify/swagger-ui';

export default fastifyPlugin(async (instance) => {
    instance.register(fastifyBlipp);
    instance.register(fastifyCors);
    instance.register(fastifySensible);
    instance.register(fastifyHelmet, {
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"], // default source is mandatory
                imgSrc: ["'self'", 'data:', 'validator.swagger.io'],
                scriptSrc: ["'self'"],
                styleSrc: ["'self'", 'https:'],
            },
        },
    });

    instance.register(swager, instance.config.swaggerOptions);
    instance.register(swagerUi, instance.config.swaggerUiOptions);

    instance.register(MikroORM, instance.config.mikroORM);
});
