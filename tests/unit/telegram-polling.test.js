/* eslint-disable no-new */
import { assert } from 'chai';
import { pause } from 'myrmidon';
import factory, { load } from '../Test';
import { findTrackLog } from '../utils';

suite('Telegram handle message');

before(async () => {
    await factory.cleanup();
    const { Telegram } = load('lib/telegram');

    new Telegram({
        bot     : { id: 'good_poll', token: 'polling_token' },
        updates : {
            mode     : 'polling',
            interval : '20ms'
        }
    });

    new Telegram({
        bot     : { id: 'bad_poll', token: 'polling_token' },
        updates : {
            mode     : 'polling',
            interval : '20ms'
        }
    });

    await pause(100);
});


test('Positive: tg count succeded requests', async () => {
    const onStart = await findTrackLog('[*url=/getUpdates&traceId=good_poll].timestamp');

    await pause(105);

    const onEnd = await findTrackLog('[*url=/getUpdates&traceId=good_poll].timestamp');
    const madeOnPeriod = onEnd.length - onStart.length;

    assert.isAtLeast(madeOnPeriod, 4);
    assert.isAtMost(madeOnPeriod, 6);
});

test('Negative: polling errors', async () => {
    const onStart = await findTrackLog('[*url=/getUpdates&traceId=bad_poll].timestamp');

    await pause(105);

    const onEnd = await findTrackLog('[*url=/getUpdates&traceId=bad_poll].timestamp');
    const madeOnPeriod = onEnd.length - onStart.length;

    assert.isAtLeast(madeOnPeriod, 4);
    assert.isAtMost(madeOnPeriod, 6);
});


after(async () => {
    await factory.cleanup();
});
