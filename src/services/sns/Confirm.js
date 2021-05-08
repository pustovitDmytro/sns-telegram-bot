import AWSApiClient from 'src/api/AWSApiClient';
import ServiceBase from '../Base';

const api = new AWSApiClient();

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
