import logger from 'lib/logger';

export default class Poll {
    constructor({ timeout, run }) {
        this.timeout = timeout;
        this.run = run;
    }

    async start() {
        setTimeout(async () => {
            try {
                await this.run();
                this.start();
            } catch (error) {
                logger.error(`POLLING_ERROR: ${error.toString()}`);
                this.start();
            }
        }, this.timeout);
    }
}
