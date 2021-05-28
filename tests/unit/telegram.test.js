import { assert } from 'chai';
import { telegramUpdates, generateTgCommand } from 'seeds';
import { dumpUpdate } from 'src/utils/dump';
import factory, { load } from '../Test';

const telegram = load('lib/telegram').default;

suite('Telegram handle message');

before(async function () {
    await factory.cleanup();
});

const [ addToChannel, getPrivateUrl ] = telegramUpdates.map((element) => dumpUpdate(element));

test('Positive: on add to channel #no-pack', async function () {
    assert.exists(
        telegram.handleMessage(addToChannel.message)
    );
});

test('Positive: get private url', async function () {
    assert.exists(
        telegram.handleMessage(getPrivateUrl.message)
    );
});

test('Positive: intro message', async function () {
    assert.exists(
        telegram.handleMessage(dumpUpdate(generateTgCommand('/start')).message)
    );
});

after(async function () {
    await factory.cleanup();
});
