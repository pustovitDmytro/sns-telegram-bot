import { URL } from 'url';
import ApiClient from 'base-api-client';
import { verbose } from 'lib/logger';

export default @verbose class AWSApiClient extends ApiClient {
    confirm(href) {
        const url = new URL(href);

        if (!/https:\/\/sns\..*\.amazonaws\.com/.test(url.origin)) throw new Error('FORBIDDEN');

        return this.get(url.href);
    }
}
