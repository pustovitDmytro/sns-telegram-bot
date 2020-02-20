import logger from 'lib/logger';
import Base from './BaseController';

function docoptKey(key) {
    const patterns = [ /--(.+)/, /<(.+)>/ ];

    for (const pattern of patterns) {
        const match = key.match(pattern);

        if (match && match.index === 0) {
            return match[1];
        }
    }

    return key;
}

export function docoptParams(opts, { include, exclude } = {}) {
    const clean = {};

    Object.keys(opts)
        .map(raw => ({ raw, key: docoptKey(raw) }))
        .filter(({ key }) => include ? include.includes(key) : true)
        .filter(({ key }) => exclude ? !exclude.includes(key) : true)
        .forEach(({ raw, key }) => {
            if (clean[key]) return;
            clean[key] = opts[raw];
        });

    return clean;
}

export default class DocoptController extends Base {
    static paramsBuilder = opts => docoptParams(opts, { exclude: [ 'confirm', 'verbose', 'quiet' ] })
    static contexBuilder = opts => opts.context || opts['--context'] && JSON.parse(opts['--context'])
    static optionsBuilder = opts => docoptParams(opts, { include: [ 'confirm', 'verbose', 'quiet' ] })

    static renderAsJson = data => {
        logger.log('info', data);
        logger.info('DONE');

        return data;
    }

    static renderAsExit = data => {
        const exitCode = data.status ? 0 : 1;

        process.exit(exitCode);
    }

    async serviceRunner({
        serviceClass,
        paramsBuilder = DocoptController.paramsBuilder,
        contexBuilder = DocoptController.contexBuilder,
        optionsBuilder = DocoptController.optionsBuilder
    }, opts) {
        const exitOnFinish = opts.exit;
        const options = optionsBuilder(opts);
        const { runService } = this;
        const promise = runService(serviceClass, {
            params  : paramsBuilder(opts),
            context : contexBuilder(opts),
            options
        });

        const data = await this.run(promise);
        const render = 'renderAsJson';

        DocoptController[render](data);

        if (exitOnFinish) {
            await DocoptController[render](data);
            DocoptController.renderAsExit(data);
        } else {
            return DocoptController[render](data);
        }
    }
}
