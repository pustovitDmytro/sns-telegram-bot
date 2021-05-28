import { assert } from 'chai';
import { pause } from 'myrmidon';
import factory, { load } from '../Test';

suite('Telegram polling #no-pack');

before(async function () {
    await factory.cleanup();
    const { Telegram } = load('lib/telegram');

    const tgApps = [
        new Telegram({
            bot     : { id: 'good_poll', token: 'polling_token' },
            updates : {
                mode     : 'polling',
                interval : '20ms'
            }
        }),

        new Telegram({
            bot     : { id: 'bad_poll', token: 'polling_token' },
            updates : {
                mode     : 'polling',
                interval : '20ms'
            }
        })
    ];

    await pause(100);
    console.log(`Started ${tgApps.length} apps`);
});


test('Positive: tg count succeded requests', async function () {
    const onStart = await factory.findTrackLog('[*url=/getUpdates&traceId=good_poll].timestamp');

    await pause(105);

    const onEnd = await factory.findTrackLog('[*url=/getUpdates&traceId=good_poll].timestamp');
    const madeOnPeriod = onEnd.length - onStart.length;

    assert.isAtLeast(madeOnPeriod, 4);
    assert.isAtMost(madeOnPeriod, 6);
});

test('Negative: polling errors', async function () {
    const onStart = await factory.findTrackLog('[*url=/getUpdates&traceId=bad_poll].timestamp');

    await pause(105);

    const onEnd = await factory.findTrackLog('[*url=/getUpdates&traceId=bad_poll].timestamp');
    const madeOnPeriod = onEnd.length - onStart.length;

    assert.isAtLeast(madeOnPeriod, 4);
    assert.isAtMost(madeOnPeriod, 6);
});


after(async function () {
    await factory.cleanup();
});
