import { URL } from 'url';
import { isFunction } from 'myrmidon';

const isGetter = (x, name) => (Object.getOwnPropertyDescriptor(x, name) || {}).get;

const deepFunctions = x =>
    x && x !== Object.prototype && Object.getOwnPropertyNames(x)
        .filter(name => isGetter(x, name) || isFunction(x[name]))
        .concat(deepFunctions(Object.getPrototypeOf(x)) || []);


export const getMethodNames = x => Array.from(new Set(deepFunctions(x)));

export function getMethodDescriptor(propertyName, target) {
    if (target.hasOwnProperty(propertyName)) {
        return Object.getOwnPropertyDescriptor(target, propertyName);
    }

    return {
        configurable : true,
        enumerable   : true,
        writable     : true,
        value        : target[propertyName]
    };
}

export function resolveUrl(base, relativeUrl) {
    const baseUrl = base ? new URL(base) : undefined;

    const absoluteUrl = new URL(relativeUrl, baseUrl);

    if (absoluteUrl.href === relativeUrl) {
        return new URL(absoluteUrl,  baseUrl);
    }

    const apiPrefix = baseUrl?.pathname;

    const relPath = (apiPrefix && apiPrefix !== '/')
        ? apiPrefix + absoluteUrl.pathname
        : relativeUrl;

    return new URL(relPath,  baseUrl);
}
