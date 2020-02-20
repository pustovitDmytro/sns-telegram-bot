import { assert } from 'chai';
import { awsEvents } from 'seeds';
import request from '../request';
import factory from '../Test';
import { queries } from '../constants';
import { findTrackLog } from '../utils';

suite('Receive SNS event');

before(async () => {
    await factory.cleanup();
});

test('Positive: receive event', async () => {
    const token = factory.getToken();

    await request
        .post(`/api/v1/sns/${token}`)
        .send(awsEvents[0])
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(({ body }) => {
            assert.ok(body.status);
        });

    const log = await findTrackLog(queries.tgSendMessage);
    const context = factory.parseToken(token);

    assert.equal(log.chat_id, context.c);
    assert.equal(log.text, "Amazon CloudWatch Alarm cis-console_auth_failures in the EU (Frankfurt) region has entered the ALARM state, because 'Threshold Crossed: 1 out of the last 1 datapoints [3.0 (13/02/20 10:23:00)] was greater than or equal to the threshold (1.0) (minimum 1 datapoint for OK -&gt; ALARM transition).' at 13-Feb-2020 10:28:28");
});
