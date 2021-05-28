import fse from 'fs-extra';
import jsonQuery from 'json-query';
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
            c : -389_952_175,
            u : 238_585_617,
            d : Date.now()
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

    async findTrackLog(query) {
        const tracks = await this.getTracks();
        const res = jsonQuery(query, {
            data         : tracks,
            enableRegexp : true
        });

        return res.value;
    }
}

export default new Test();

export {
    seeds
};
