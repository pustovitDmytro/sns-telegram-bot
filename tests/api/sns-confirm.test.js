import { assert } from 'chai';
import { awsConfirmation } from 'seeds';
import request from '../request';
import factory from '../Test';
import { queries } from '../constants';

suite('Confirm SNS Subscriptions');

before(async function () {
    await factory.cleanup();
});

test('Positive: confirm', async function () {
    await request
        .with(this)
        .post(`/api/v1/sns/${factory.getToken()}`)
        .send(awsConfirmation)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(({ body }) => {
            assert.ok(body.status);
        });

    const log = await factory.findTrackLog(queries.awsConfirm);

    assert.equal(log, awsConfirmation.SubscribeURL);
});

after(async function () {
    await factory.cleanup();
});

