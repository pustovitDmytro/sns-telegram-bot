import { dumpUpdate } from 'src/utils/dump';
import telegram from 'lib/telegram';
import Base from '../Base';

export default class TelegramProcessUpdate extends Base {
    async run(tgUpdate) {
        const update = dumpUpdate(tgUpdate);

        await telegram.processUpdate(update);
    }
}
