import telegram from 'lib/telegram';
import { app, updates } from 'src/config';
import Base from '../Base';

const webhookUrl = `${app.url}${app.prefix}/updates/${updates.webhook}`;

export default class TelegramSetWebhook extends Base {
    async run({ url = webhookUrl }) {
        let current = await telegram.getWebhook();

        this.verbose('current WebhookUrl: ', current);
        if (this.confirm) {
            current = await telegram.setWebhook(url);
        }

        return { data: current  };
    }
}
