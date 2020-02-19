// import fse from 'fs-extra';
import { trackedLogs } from 'lib/logger';
import aes from 'lib/aes';
import seeds from 'seeds';

export {
    seeds
};

export class Test {
    async cleanup() {
        trackedLogs.length = 0;
    }

    parseToken(token) {
        return aes.decrypt(token);
    }

    async getTracks() {
        return trackedLogs;
    }
}

export default new Test();
