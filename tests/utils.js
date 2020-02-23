import { URL } from 'url';
import jsonQuery from 'json-query';
import factory from './Test';


export function extractUrls(text) {
    const pattern = /(?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:\'".,<>?«»“”‘’]))?/; // eslint-disable-line

    return text.match(new RegExp(pattern, 'ig')).map(u => new URL(u));
}

export async function findTrackLog(query) {
    const tracks = await factory.getTracks();
    const res = jsonQuery(query, {
        data : tracks
    });

    return res.value;
}
