import AWSApiClient from 'src/api/AWSApiClient';
import { isTest } from 'config';
import ServiceBase from '../Base';

const api = new AWSApiClient({ mock: isTest });

export default class ConfirmSNS extends ServiceBase {
    static LOG_LEVEL = 'verbose'
    static rules = {
        'Type'         : [ 'required', { eq: 'SubscriptionConfirmation' } ],
        'MessageId'    : [ 'required', 'uuid' ],
        'Token'        : [ 'required', 'string' ],
        'TopicArn'     : [ 'required', 'string' ],
        'SubscribeURL' : [ 'required', 'url' ]
    };

    async execute({ SubscribeURL }) {
        await api.confirm(SubscribeURL);

        return {};
    }
}
