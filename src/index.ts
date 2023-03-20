import * as dotenv from 'dotenv';
dotenv.config();

import App from './app';

(async () => {
    try {
        const PORT = Number(process.env.PORT || 3500);
        const instance = await App();

        await instance.listen({ port: PORT, host: '0.0.0.0' });

        console.log(`server listening on ${PORT}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
})();
