import { assert } from 'chai';
import { getToken } from 'seeds';
import request from '../request';

suite.only('Create Session');

test.only('Positive: on add to channel', async () => {
    const payload = getToken[0];

    await request
        .post('/api/v1/updates/test_webhook_url')
        .send(payload)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(({ body }) => {
            console.log('body: ', body);
        });
});

