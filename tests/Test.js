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

    getToken() {
        return aes.encrypt({
            c : -389952175,
            u : 238585617,
            d : +new Date()
        });
    }

    async getTracks() {
        return trackedLogs;
    }
}

export default new Test();
