import { URL } from 'url';
import path from 'path';
import jsonQuery from 'json-query';
import factory from './Test';
import { entry } from './constants';


export function extractUrls(text) {
    const pattern = /(?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:\'".,<>?«»“”‘’]))?/; // eslint-disable-line

    return text.match(new RegExp(pattern, 'ig')).map(u => new URL(u));
}

export async function findTrackLog(query) {
    const tracks = await factory.getTracks();
    const res = jsonQuery(query, {
        data         : tracks,
        enableRegexp : true
    });

    return res.value;
}

export function load(relPath, clearCache) {
    const absPath = path.resolve(entry, relPath);

    if (clearCache) delete require.cache[require.resolve(absPath)];
    // eslint-disable-next-line security/detect-non-literal-require
    const result =  require(absPath);

    if (clearCache) delete require.cache[require.resolve(absPath)];

    return result;
}

export function resolve(relPath) {
    return require.resolve(path.join(entry, relPath));
}
