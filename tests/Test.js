import fse from 'fs-extra';
import seeds from 'seeds';
import { tmpFolder } from './constants';
import { mockAPI, unMockAPI, trackedLogs } from './mock';
import './init-hooks';
import { load } from './utils';

export * from './utils';

// eslint-disable-next-line import/export
export * from './constants';

mockAPI();

class Test {
    constructor() {
        this.aes = load('lib/aes').default;
    }

    async cleanup() {
        trackedLogs.length = 0;
    }

    parseToken(token) {
        return this.aes.decrypt(token);
    }

    getToken() {
        return this.aes.encrypt({
            c : -389952175,
            u : 238585617,
            d : +new Date()
        });
    }

    async getTracks() {
        return trackedLogs;
    }

    async setTmpFolder() {
        await fse.ensureDir(tmpFolder);
    }

    async cleanTmpFolder() {
        await fse.remove(tmpFolder);
    }

    mockAPI = mockAPI

    unMockAPI= unMockAPI
}

export default new Test();

export {
    seeds
};
