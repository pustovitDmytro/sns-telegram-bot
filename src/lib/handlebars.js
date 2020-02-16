import path       from 'path';
import handlebars from 'handlebars';
import logger     from 'lib/logger';
import TEMPLATES from 'templates';

handlebars.registerHelper('json', (object) => {
    return JSON.stringify(object, null, 4);
});

handlebars.registerHelper('lower', (string) => {
    return string.toLowerCase();
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
