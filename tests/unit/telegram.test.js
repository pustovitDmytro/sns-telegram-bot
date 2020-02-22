import { assert } from 'chai';
import { telegramUpdates } from 'seeds';
import telegram from 'lib/telegram';
import { dumpUpdate } from 'src/utils';
import factory from '../Test';

suite('Telegram handle message');

before(async () => {
    await factory.cleanup();
});

const [ addToChannel, getPrivateUrl ] = telegramUpdates.map(dumpUpdate);

test('Positive: on add to channel', async () => {
    // assert.equal(
    //     telegram.handleMessage(addToChannel.message),
    //     'Your url: http://localhost:8080/sns/hImxDoSMyHYYuVEKFv3sA7WdHao8mZg4o6JESHdgG8bsHkH2UaA8NySEJEF6jr6UJ/'
    // );
});

test.only('Positive: get private url', async () => {
    telegram.handleMessage(getPrivateUrl.message);
    // assert.equal(
    //     'Your url: http://localhost:8080/sns/hImxDoSMyHYYuVEKFv3sA7WdHao8mZg4o6JEXyf3nZL80QJEBZxxQHcMXNNqf5a1z/'
    // );
});

