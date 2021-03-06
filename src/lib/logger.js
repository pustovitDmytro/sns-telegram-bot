import { Decorator } from 'logger-decorator';
import { createLogger, format, transports } from 'winston';
import { name } from 'package';
import Error from 'src/error';

/* eslint-disable camelcase */
const { npm_config_loglevel, DEBUG, LOG_LEVEL, MODE, SILENT } = process.env;
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
