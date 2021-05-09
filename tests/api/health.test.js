import { assert } from 'chai';
import request from '../request';
import '../Test';

suite('Health Check');

test('Negative: Bad Route',  async function () {
    await request
        .with(this)
        .get('/api/v1/agewash')
        .expect(404);
});

test('Positive: Health Check',  async function () {
    await request
        .with(this)
        .get('/api/v1/health')
        .expect(200);
});

test('Positive: Get app info',  async function () {
    await request
        .with(this)
        .get('/api/v1/info')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(({ body }) => {
            assert.ok(body.status);
            assert.isString(body.description);
            assert.isString(body.version);
        });
});

