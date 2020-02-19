import { isObject, isFunction } from 'myrmidon';
import BaseService from 'src/services/Base';
import Error from 'src/error';
import { decorator } from 'lib/logger';

export default class BaseController {
    buildController(config) {
        const build = {};

        Object.keys(config).forEach(key => {
            const current = config[key];

            if (isObject(current)) {
                return build[key] = this.buildController(current);
            }

            if (current?.prototype instanceof BaseService) {
                return build[key] = this.makeServiceRunner(current);
            }

            if (isFunction(current)) {
                return build[key] = current.bind(this);
            }

            build[key] = current;
        });

        return build;
    }

    runService(Service, { context, params, options }) {
        const service = new Service({ context, options });
        const dec = decorator({
            serviceName      : service.constructor.name,
            level            : service.constructor.LOG_LEVEL,
            contextSanitizer : service.sanitizeContext,
            paramsSanitizer  : service.sanitizeParams
        });

        return dec(service.run).call(service, params);
    }

    async run(promise) {
        try {
            const data = await promise;

            return {
                ...data,
                status : 1
            };
        } catch (err) {
            return {
                error  : Error.render(err),
                status : 0
            };
        }
    }

    makeServiceRunner = (serviceClass, paramsBuilder, contexBuilder, render) => {
        return this.serviceRunner.bind(this, {
            serviceClass,
            paramsBuilder,
            contexBuilder,
            render
        });
    }
}
