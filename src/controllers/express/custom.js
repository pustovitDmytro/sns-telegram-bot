const httpSuccessCode = 200;

export function health(req, res) {
    res.sendStatus(httpSuccessCode);
}

export function router(routeTable, express, req, res) {
    const requestType = req._context.aws;
    const service = routeTable[requestType];
    const runner = express.makeServiceRunner(service);

    return runner(req, res);
}
