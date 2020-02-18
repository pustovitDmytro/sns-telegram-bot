import ServiceBase  from '../Base';
// import { Confirm, Event } from '../sns';

export default class SessionsCheck extends ServiceBase {
    static LOG_LEVEL = 'verbose'

    static rules = {
        body : [ 'required', 'any_object' ]
    };

    async execute() {
        return {
            service : 'aws',
            type    : 'SnsSubscriptionConfirmation'
        };
    }
}
