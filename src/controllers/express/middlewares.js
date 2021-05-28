import cors       from 'cors';
import bodyParser from 'body-parser';

export default {
    json : bodyParser.json({
        limit  : 1024 * 1024,
        type   : [ 'txt', 'json' ],
        verify : (req, res, buf) => {
            try {
                JSON.parse(buf);
            } catch {
                res.send({
                    status : 0,
                    error  : {
                        code    : 'FORMAT_ERROR',
                        message : 'BROKEN_JSON'
                    }
                });
                throw new Error('BROKEN_JSON');
            }
        }
    }),
    arrays(req, res, next) {
        const keys = Object.keys(req.query);

        keys
            .filter(key => req.query[key].includes(','))
            // eslint-disable-next-line no-param-reassign
            .forEach(key => req.query[key] = req.query[key].split(','));

        return next();
    },
    urlencoded : bodyParser.urlencoded({ extended: true }),
    cors       : cors({ origin: '*' })
};
