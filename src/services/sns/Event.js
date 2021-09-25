
import handlebars from 'lib/handlebars';
import telegram from 'lib/telegram';
import ServiceBase from '../Base';

export default class SnsEvent extends ServiceBase {
    static LOG_LEVEL = 'verbose'

    static rules = {
        'AlarmName'       : [ 'required', 'string' ],
        'NewStateValue'   : [ 'required', 'string' ],
        'NewStateReason'  : [ 'required', 'string' ],
        'StateChangeTime' : [ 'required', 'date' ],
        'Region'          : [ 'required', 'string' ],
        'AWSAccountId'    : [ 'required', 'string' ]
    };

    async execute(data) {
        const text = handlebars.templates.alarms.default(data);
        const { chat } = this.context.telegram;

        await telegram.sendMessage({ id: chat }, text);

        return {};
    }
}
