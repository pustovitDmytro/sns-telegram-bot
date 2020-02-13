import cors       from 'cors';
import bodyParser from 'body-parser';

module.exports = {
    json : bodyParser.json({
        limit  : 1024 * 1024,
        verify : (req, res, buf) => {
            try {
                JSON.parse(buf);
            } catch (e) {
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
            .forEach(key => req.query[key] = req.query[key].split(',')); //eslint-disable-line

        return next();
    },
    urlencoded : bodyParser.urlencoded({ extended: true }),
    cors       : cors({ origin: '*' })
};
