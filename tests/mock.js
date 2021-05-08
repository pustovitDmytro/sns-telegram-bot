/* eslint-disable security/detect-object-injection */
// import API_ERROR from 'base-api-client/lib/Error';
import path from 'path';
import { getNamespace } from 'cls-hooked';
import ArrayTransport from 'winston-array-transport';
import { createLogger, format, transports } from 'winston';
// import seeds from 'seeds';
import { load } from './Test';

const trackTransports = [];

export const trackedLogs = [];
const { TRACK_REQUESTS, TRACK_REQUESTS_TO_STDOUT } = process.env;

if (TRACK_REQUESTS_TO_STDOUT) {
    trackTransports.push(new transports.Console());
}

trackTransports.push(new ArrayTransport({ array: trackedLogs, json: true }));

if (TRACK_REQUESTS) {
    trackTransports.push(new transports.File({
        filename : path.resolve(process.cwd(), TRACK_REQUESTS)
    }));
}

export const trackLogger = createLogger({
    format : format.combine(
        format.timestamp(),
        format.json()
    ),
    transports : trackTransports,
    level      : 'debug'
});


const AWSApiClient = load('api/AWSApiClient.js').default;
const TelegramApiClient = load('api/TelegramApiClient.js').default;
const telegram = load('lib/telegram').default;

telegram.logger = trackLogger;

function axiosResponse(data) {
    return { data };
}

// function axiosError(message, data) {
//     const err = new Error(message);

//     err.response = { data };

//     return new API_ERROR(err);
// }


class MockAWSApiClient extends AWSApiClient {
    async _axios() {
        return axiosResponse();
    }

    log() {
        trackLogger.log(...arguments);
    }

    getTraceId() {
        return getNamespace('__TEST__').get('current').id;
    }
}

class MockTelegramApiClient extends TelegramApiClient {
    async _axios() {
        return axiosResponse();
    }

    log() {
        trackLogger.log(...arguments);
    }

    getTraceId() {
        return getNamespace('__TEST__').get('current').id;
    }
}

const tgMethods = Object.getOwnPropertyNames(MockTelegramApiClient.prototype).filter(m => m !== 'constructor');
const awsMethods = Object.getOwnPropertyNames(MockAWSApiClient.prototype).filter(m => m !== 'constructor');

const BACKUP = { tg: {}, aws: {} };

tgMethods.forEach(methodName => {
    BACKUP.tg[methodName] = TelegramApiClient.prototype[methodName];
});
awsMethods.forEach(methodName => {
    BACKUP.tg[methodName] = AWSApiClient.prototype[methodName];
});


export function mockAPI() {
    tgMethods.forEach(methodName => {
        TelegramApiClient.prototype[methodName] = MockTelegramApiClient.prototype[methodName];
    });

    awsMethods.forEach(methodName => {
        AWSApiClient.prototype[methodName] = MockAWSApiClient.prototype[methodName];
    });
}


export function unMockAPI() {
    tgMethods.forEach(methodName => {
        MockTelegramApiClient.prototype[methodName] = TelegramApiClient.prototype[methodName];
    });
    awsMethods.forEach(methodName => {
        MockAWSApiClient.prototype[methodName] = AWSApiClient.prototype[methodName];
    });
}

