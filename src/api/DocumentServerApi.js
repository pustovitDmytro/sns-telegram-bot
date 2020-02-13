import Error from 'src/error';
import { verbose } from '../logger';
import ApiClient from './ApiClient';

export default @verbose class TelegramApiClient extends ApiClient {
    throwApiError(httpError, message) {
        const isHttpError = !!httpError.isAxiosError;

        if (isHttpError) return super.throwApiError(httpError);

        const error = new Error('INTERNAL_DOCUMENT_SERVER_ERROR', {
            httpError,
            code : this.ERROR_CODE
        });

        error.message = message || JSON.stringify(httpError);

        throw error;
    }

    async getUpdates(lastUpdate = 0) {
        if (this.mock) return [];
        const data = await this.get('/getUpdates', {
            limit  : 10,
            offset : lastUpdate + 1
        });

        return data.map(dumpUpdate);
    }

    async sendMessage(chatId, html) {
        const data = await this.post('/sendMessage', {
            'parse_mode' : 'HTML',
            'chat_id'    : chatId,
            text         : html
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

