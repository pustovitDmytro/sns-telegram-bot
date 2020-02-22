import handlebars from 'handlebars';
import logger     from 'lib/logger';
import TEMPLATES from 'templates';
import { app } from 'config';

handlebars.registerHelper('json', (object) => {
    return JSON.stringify(object, null, 4);
});

handlebars.registerHelper('lower', (string) => {
    return string.toLowerCase();
});

handlebars.registerHelper('appUrl', () => {
    return app.url;
});

handlebars.registerHelper('datetime', (date) => {
    return date.format('DD-MMM-YYYY HH:mm:ss');
});

handlebars.registerHelper('link', (link, text) => {
    return `<a href="${link}">${text}</a>`;
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
