import { URL } from 'url';
import path from 'path';
import { entry } from './constants';

export function extractUrls(text) {
    const pattern = /(?:(?:https?|ftp):\/\/|[\da-z]+\.)(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s!"'(),.:;<>?[\]`{}«»‘’“”]))?/;

    return text.match(new RegExp(pattern, 'ig')).map(u => new URL(u));
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
