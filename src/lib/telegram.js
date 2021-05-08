// import { inspect } from 'util';
import ms from 'ms';
import { pause } from 'myrmidon';
import config from 'config';
import logger, { log } from 'lib/logger';
import TelegramApiClient from 'src/api/TelegramApiClient';
import Poll from 'lib/polling';
import handlebars from 'lib/handlebars';
import aes from 'lib/aes';
import { version } from 'package';

const waitUnitStartListen = 20;

@log
export class Telegram {
    constructor({ bot, updates }) {
        this.api = new TelegramApiClient(`https://api.telegram.org/bot${bot.id}:${bot.token}`, {
            timeout : '10s'
        });
        this._init(updates);
        this._id = +bot.id;
    }

    async _init({ mode, interval, webhook }) {
        if (mode === 'polling') this._initPolling(interval);
        if (mode === 'webhook') await this._initWebhook(`${config.app.url}${config.app.prefix}/updates/${webhook}`);
    }

    _initPolling(pollingTime) {
        this.pollTimeout = ms(pollingTime);
        const poll = new Poll({
            timeout : this.pollTimeout,
            run     : this.polling
        });

        poll.start();
        logger.verbose(`POLLING STARTED WITH INTERVAL ${pollingTime}`);
    }

    async _initWebhook(webhookUrl) {
        await pause(waitUnitStartListen);

        if (webhookUrl !== await this.getWebhook()) {
            await this.setWebhook(webhookUrl);
            logger.verbose(`WEBHOOK_URL SET TO ${webhookUrl}`);
        } else {
            logger.verbose(`WEBHOOK_URL HAS BEEN ALREADY SET TO ${webhookUrl}`);
        }
    }

    handleMessage(message) {
        const { type, payload, to, from } = message;
        const isAddedToGroup = type === 'NEW_MEMBER' && payload.id === this._id;

        if (isAddedToGroup) {
            const token = aes.encrypt({ c: to.id, u: from.id, d: +new Date(), v: version });

            return handlebars.templates.telegram.urlSuccess({ token });
        }

        const isCommand = type === 'COMMAND';

        if (isCommand) {
            if (payload.command === 'url') {
                const token = aes.encrypt({ c: from.id, d: +new Date(), v: version });

                return handlebars.templates.telegram.urlSuccess({ token });
            }

            if (payload.command === 'help') return handlebars.templates.telegram.help();
            if (payload.command === 'start') return handlebars.templates.telegram.start();

            return handlebars.templates.telegram.badCommand();
        }
    }

    processUpdate = async update => {
        const answer = this.handleMessage(update.message);

        if (answer) {
            await this.sendMessage(update.message.to, answer);
        }
    }

    polling = async () => {
        const updates = await this.api.getUpdates(this.lastUpdate);

        if (updates.length) {
            this.lastUpdate = updates[updates.length - 1].id;
        }

        await Promise.all(updates.map(this.processUpdate));
    }

    sendMessage(chat, message) {
        return this.api.sendMessage(chat.id, message);
    }

    setWebhook(url) {
        return this.api.setWebhook(url);
    }

    getWebhook() {
        return this.api.getWebhook();
    }
}

export default new Telegram({
    bot     : config.bot,
    updates : config.updates
});
