import handlebars from 'handlebars';
import logger     from 'lib/logger';
import TEMPLATES from 'templates';
import { app } from 'config';

const jsonIdentation = 4;

handlebars.registerHelper('json', (object) => {
    return JSON.stringify(object, null, jsonIdentation);
});

handlebars.registerHelper('lower', (string) => {
    return string.toLowerCase();
});

handlebars.registerHelper('appUrl', () => app.url);
handlebars.registerHelper('apiUrl', () => `${app.url}${app.prefix}`);

handlebars.registerHelper('datetime', (date) => {
    return date.format('DD-MMM-YYYY HH:mm:ss Z');
});

handlebars.registerHelper('link', (link, text) => {
    return new handlebars.SafeString(`<a href='${link}'>${text}</a>`);
});

handlebars.registerHelper('nl', () => {
    return new handlebars.SafeString('&#10');
});

class Handlebars {
    constructor() {
        this.templates = {};
        Object.entries(TEMPLATES)
            .forEach(([ key, value ]) => {
                this.templates[key] = {};
                Object.entries(value)
                    .forEach(([ name, content ]) => {
                        this.templates[key][name] = handlebars.compile(content);
                    });
            });

        logger.verbose('HANDLEBARS TEMPLATES READY');
    }
}

export default new Handlebars();
