import fastify from 'fastify';
import Autoload from '@fastify/autoload';
import path from 'path';

import * as config from './config';

const App = async () => {
    const instance = fastify({
        logger: {
            level: 'info',
        },
    });

    instance.decorate('config', config);

    instance.register(Autoload, {
        dir: path.resolve(__dirname, 'routes'),
        ignorePattern: /.*.(test|spec|entity).(js|ts)/,
        maxDepth: 1,
    });

    return instance;
};

export default App;

declare module 'fastify' {
    interface FastifyInstance {
        config: typeof config;
    }
}
