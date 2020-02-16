import path from 'path';
import { Decorator } from 'logger-decorator';
import { name } from 'package';
import Error from 'src/error';

const { createLogger, format, transports } = require('winston');

/* eslint-disable camelcase */
const { npm_config_loglevel, DEBUG, LOG_LEVEL, MODE, TRACK, SILENT } = process.env;
const level = LOG_LEVEL || DEBUG && 'debug' || MODE === 'test' && 'error' || npm_config_loglevel || 'notice';
/* eslint-enable camelcase */

export const isDebug = level === 'debug';

const appNameFormat = format(info => {
    info.application = name; // eslint-disable-line no-param-reassign

    return info;
});

const logger = createLogger({
    level,
    levels : {
        error   : 0,
        warn    : 1,
        info    : 2,
        notice  : 3,
        verbose : 4,
        debug   : 5
    },
    format : format.combine(
        appNameFormat(),
        format.timestamp(),
        format.json()
    ),
    transports : [
        new transports.Console({ level: 'error', stderrLevels: [ 'error' ], silent: SILENT }),
        new transports.Console({ silent: SILENT  })
    ]
});

export default logger;

export const decorator = new Decorator({
    logger     : logger.log.bind(logger),
    errorLevel : d => d?.error instanceof Error ? 'warn' : 'error',
    level      : 'notice'
});

export const debug = decorator({ level: 'debug' });
export const verbose = decorator({ level: 'verbose' });
export const notice = decorator({ level: 'notice' });
export const info = decorator({ level: 'info' });
export const log = decorator({ level: 'info' });

const trackTransports = [];

if (TRACK === 'stdout') {
    trackTransports.push(new transports.Console());
} else if (TRACK) {
    trackTransports.push(new transports.File({
        filename : path.resolve(process.cwd(), TRACK)
    }));
}

export const trackLogger = createLogger({
    format : format.combine(
        format.timestamp(),
        format.json()
    ),
    transports : trackTransports
});

