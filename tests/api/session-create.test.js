import { assert } from 'chai';
import request from '../request';

suite.only('Create Session');

const tgUserId = '11111';

test('Positive: myself and template', async () => {
    const template =  'Amazon CloudWatch Alarm "{{AlarmName}}" in the {{Region}} region has entered the {{NewStateValue}} state, because "{{NewStateReason}}" at {{StateChangeTime}}';
    const command = `/url ${tgUserId} ${template}`;

    await request
        .get('/api/v1/info')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(({ body }) => {
        });
});

