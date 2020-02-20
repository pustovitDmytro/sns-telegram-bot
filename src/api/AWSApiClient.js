import { URL } from 'url';
import { verbose } from 'lib/logger';
import ApiClient from './ApiClient';

export default @verbose class AWSApiClient extends ApiClient {
    confirm(href) {
        const url = new URL(href);

        if (!url.origin.match(/https:\/\/sns\..*\.amazonaws\.com/)) throw new Error('FORBIDDEN');

        return this.get(url);
    }
}
