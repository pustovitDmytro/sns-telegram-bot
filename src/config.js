import path from 'path';
import confme from 'confme';

const config = confme(
    path.join(__dirname, '../', 'etc', 'config.json')
);

config.isTest = process.env.MODE === 'test';

export default config;

const  { cipher, bot, updates, app } = config;

export { cipher, bot, updates, app };
