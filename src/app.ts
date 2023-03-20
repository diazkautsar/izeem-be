import fastify from 'fastify';
import Autoload from '@fastify/autoload';
import path from 'path';

const App = async () => {
    const instance = fastify({
        logger: {
            level: 'info',
        },
    });

    return instance;
};

export default App;

declare module 'fastify' {
    interface FastifyInstance {}
}
