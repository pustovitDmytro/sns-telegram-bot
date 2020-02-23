import { assert } from 'chai';
import { telegramUpdates, generateTgCommand } from 'seeds';
import telegram from 'lib/telegram';
import { dumpUpdate } from 'src/utils';
import factory from '../Test';

suite('Telegram handle message');

before(async () => {
    await factory.cleanup();
});

const [ addToChannel, getPrivateUrl ] = telegramUpdates.map(dumpUpdate);

test('Positive: on add to channel', async () => {
    assert.exists(
        telegram.handleMessage(addToChannel.message),
    );
});

test('Positive: get private url', async () => {
    assert.exists(
        telegram.handleMessage(getPrivateUrl.message)
    );
});

test('Positive: intro message', async () => {
    assert.exists(
        telegram.handleMessage(dumpUpdate(generateTgCommand('/start')).message)
    );
});

