import ApiClient from 'base-api-client';
import API_ERROR from 'base-api-client/lib/Error';
import { TG_ERROR } from 'src/error';
import { verbose } from 'lib/logger';
import { dumpUpdate, dumpMessage } from 'utils';

export default @verbose class TelegramApiClient extends ApiClient {
    onResponse({ data }) {
        if (!data.ok) throw data;

        return data.result;
    }

    onError(httpError) {
        const apiError =  new API_ERROR(httpError);

        throw new TG_ERROR(apiError);
    }

    async getUpdates(lastUpdate = 0) {
        const data = await this.get('/getUpdates', {
            limit  : 10,
            offset : lastUpdate + 1
        });

        return data.map((element) => dumpUpdate(element));
    }

    async sendMessage(chatId, html) {
        const data = await this.post('/sendMessage', {
            'parse_mode'               : 'HTML',
            'chat_id'                  : chatId,
            text                       : html,
            'disable_web_page_preview' : true
        });

        return dumpMessage(data);
    }

    async setWebhook(url) {
        const data = await this.post('/setWebhook', {
            url
        });

        if (data) return url;
    }

    async getWebhook() {
        const data = await this.get('/getWebhookInfo');

        return data.url;
    }
}
