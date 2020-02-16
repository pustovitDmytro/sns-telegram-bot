// import { inspect } from 'util';
import ms from 'ms';
import config from 'config';
import logger, { log } from 'lib/logger';
import TelegramApiClient from 'src/api/TelegramApiClient';
import Poll from 'lib/polling';
import handlebars from 'lib/handlebars';

const isTest = process.env.MODE === 'test';

@log
class Telegram {
    constructor({ bot, updates }) {
        this.api = new TelegramApiClient({
            timeout : '10s',
            url     : `https://api.telegram.org/bot${bot.id}:${bot.token}`,
            mock    : isTest
        });
        this._init(updates);
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
        if (webhookUrl !== this.getWebhook()) {
            await this.setWebhook(webhookUrl);
            logger.verbose(`WEBHOOK_URL SET TO ${webhookUrl}`);
        } else {
            logger.verbose(`WEBHOOK_URL HAS BEEN ALREADY SET TO ${webhookUrl}`);
        }
    }
    processUpdate = update => {
        const { message } = update;
        const html = handlebars.templates.REPORT({ message });

        return this.sendMessage(message.from, html);
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
