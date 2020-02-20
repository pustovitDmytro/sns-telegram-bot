import Base from './BaseController';

export default class ExpressController extends Base {
    static paramsBuilder = req => ({ ...req.query, ...req.params, ...req.body })
    static contexBuilder = req => req._context
    static optionsBuilder = () => ({
        confirm : true,
        verbose : false,
        quiet   : false
    })
    static renderAsJson = (req, res, next, data) => res.send(data)
    static renderAsFile = (req, res, next, data) => {
        const { stream, filename, status } = data;

        if (status === 1) {
            res.attachment(filename);
            stream.pipe(res);
        } else {
            ExpressController.renderAsJson(req, res, next, data);
        }
    }
    static renderAsSessionMiddlevare = (req, res, next, data) => {
        const { status, ...payload } = data;

        if (status === 1) {
            req._context = { ...(req._context || {}), ...payload }; // eslint-disable-line no-param-reassign

            return next();
        }
        ExpressController.renderAsJson(req, res, next, data);
    }

    async serviceRunner({
        serviceClass,
        paramsBuilder = ExpressController.paramsBuilder,
        contexBuilder = ExpressController.contexBuilder,
        render = ExpressController.renderAsJson
    }, req, res, next) {
        const promise = this.runService(serviceClass, {
            params  : paramsBuilder(req, res),
            context : contexBuilder(req, res)
        });
        const data = await this.run(promise);

        render(req, res, next, data);
    }
}
