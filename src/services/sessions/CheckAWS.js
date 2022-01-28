import ServiceBase  from '../Base';
// import { Confirm, Event } from '../sns';

const AWS_REQUEST_TYPES = {
    SubscriptionConfirmation : 'SnsSubscriptionConfirmation'
};

export default class AWSSessionsCheck extends ServiceBase {
    static LOG_LEVEL = 'verbose';

    static rules = {
        data : [ 'required', { 'nested_object' : {
            AlarmName : [ 'string' ],
            Type      : [ { 'one_of': Object.keys(AWS_REQUEST_TYPES) } ]
        } } ]
    };

    async execute({ data }) {
        if (data.Type) return { aws: AWS_REQUEST_TYPES[data.Type] };
        if (data.AlarmName) return { aws: 'SnsAlarmEvent' };

        return { aws: null };
    }
}
