import path from 'path';
import fse from 'fs-extra';
import { trackedLogs } from 'lib/logger';
import aes from 'lib/aes';
import seeds from 'seeds';
import { tmpFolder, entry } from './constants';

class Test {
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

    async setTmpFolder() {
        await fse.ensureDir(tmpFolder);
    }

    async cleanTmpFolder() {
        await fse.remove(tmpFolder);
    }
}


function load(relPath) {
    // eslint-disable-next-line security/detect-non-literal-require
    return require(path.join(entry, relPath));
}

function resolve(relPath) {
    return require.resolve(path.join(entry, relPath));
}

export default new Test();

export {
    tmpFolder,
    entry,
    load,
    resolve,
    seeds
};
