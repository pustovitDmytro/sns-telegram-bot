import packageInfo from 'package';
import ServiceBase from '../Base';

export default class SystemInfo extends ServiceBase {
    static LOG_LEVEL = 'verbose'
    static rules = {};

    async execute() {
        return {
            app         : packageInfo.name,
            version     : packageInfo.version,
            description : packageInfo.description
        };
    }
}
