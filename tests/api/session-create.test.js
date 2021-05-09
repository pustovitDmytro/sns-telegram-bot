import { assert } from 'chai';
import { telegramUpdates } from 'seeds';
import request from '../request';
import factory from '../Test';
import { queries } from '../constants';
import { extractUrls, findTrackLog } from '../utils';

suite('Create Session');

before(async () => {
    await factory.cleanup();
});

test('Positive: on add to channel', async function () {
    const payload = telegramUpdates[0];

    await request
        .with(this)
        .post('/api/v1/updates/test_webhook_url')
        .send(payload)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(({ body }) => {
            assert.ok(body.status);
        });

    const log = await findTrackLog(queries.tgSendMessage);

    const [ url ] = extractUrls(log.text);
    const token = url.pathname.split('/').reverse().find(i => i);

    assert.equal(log.chat_id, payload.message.chat.id);
    assert.exists(token);
    assert.deepOwnInclude(factory.parseToken(token), {
        c : payload.message.chat.id,
        u : payload.message.from.id
    });
});

after(async () => {
    await factory.cleanup();
});

