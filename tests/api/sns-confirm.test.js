import { assert } from 'chai';
import { awsConfirmation } from 'seeds';
import request from '../request';
import factory from '../Test';
import { queries } from '../constants';
import { findTrackLog } from '../utils';

suite('Confirm SNS Subscriptions');

before(async () => {
    await factory.cleanup();
});

test('Positive: confirm', async () => {
    await request
        .post(`/api/v1/sns/${factory.getToken()}`)
        .send(awsConfirmation)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(({ body }) => {
            assert.ok(body.status);
        });

    const log = await findTrackLog(queries.awsConfirm);

    assert.equal(log, awsConfirmation.SubscribeURL);
});

after(async () => {
    await factory.cleanup();
});

