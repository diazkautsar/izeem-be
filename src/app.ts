import fastify from 'fastify';
import Autoload from '@fastify/autoload';
import path from 'path';

import * as config from './config';
import plugins from './plugins';

const App = async () => {
    const instance = fastify({
        logger: {
            level: 'info',
        },
    });

    instance.decorate('config', config);
    instance.register(plugins);

    instance.register(Autoload, {
        dir: path.resolve(__dirname, 'routes'),
        ignorePattern: /.*.(test|spec|entity).(js|ts)/,
        maxDepth: 1,
    });

    instance.setErrorHandler((error, request, reply) => {
        reply.status(Number(error.statusCode ?? 500)).send({
            status: false,
            statusCode: error.code,
            message: error.message,
            messageTitle: error.message,
            data: null,
        });
    });

    return instance;
};

export default App;

declare module 'fastify' {
    interface FastifyInstance {
        config: typeof config;
    }
}
