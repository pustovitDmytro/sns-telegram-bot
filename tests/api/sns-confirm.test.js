import { assert } from 'chai';
import { awsConfirmation } from 'seeds';
import request from '../request';
import factory from '../Test';
import { queries } from '../constants';
import { extractUrls, findTrackLog } from '../utils';

suite('Confirm SNS Subscriptions');

before(async () => {
    await factory.cleanup();
});

test.only('Positive: confirm', async () => {
    await request
        .post(`/api/v1/sns/${factory.getToken()}`)
        .send(awsConfirmation)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(({ body }) => {
            console.log('body: ', body);
            assert.ok(body.status);
        });

    // const log = await findTrackLog(queries.tgSendMessage);

    // const [ url ] = extractUrls(log.text);
    // const token = url.pathname.split('/').reverse().find(i => i);

    // assert.equal(log.chat_id, payload.message.chat.id);
    // assert.exists(token);
    // assert.deepOwnInclude(factory.parseToken(token), {
    //     c : payload.message.chat.id,
    //     u : payload.message.from.id
    // });
});

