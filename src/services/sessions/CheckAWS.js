import ServiceBase  from '../Base';
// import { Confirm, Event } from '../sns';

export default class AWSSessionsCheck extends ServiceBase {
    static LOG_LEVEL = 'verbose'

    static rules = {
        data : [ 'required', { 'nested_object' : {
            AlarmName : [ 'string' ],
            Type      : [ { 'one_of': [ 'SnsSubscriptionConfirmation' ] } ]
        } } ]
    };

    async execute({ data }) {
        if (data.type) return { aws: data.type };
        if (data.AlarmName) return { aws: 'SnsAlarmEvent' };

        return { aws: null };
    }
}
