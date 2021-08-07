import { inspect } from 'util';
import LIVR from 'livr';
import { assert,  AssertionError } from 'chai';
import { isFunction } from 'myrmidon';
import dayjs from 'dayjs';
import factory, { load } from '../Test';

load('lib/livr.js');

function testLIVR(data, rule, { valid, error } = {}) {
    try {
        const validator = new LIVR.Validator({ data: rule });
        const validData = validator.validate({ data });
        const errors = validator.getErrors();

        if (!error) {
            assert.notOk(errors, data);
            if (isFunction(valid)) return valid(validData.data);
            assert.ok(validData, data);
            assert.deepEqual(validData.data, valid);
        }

        if (error) {
            assert.ok(errors, data);
            assert.notOk(validData, data);
            assert.deepEqual(errors.data, error);
        }
    } catch (error_) {
        if (!(error_ instanceof AssertionError)) console.log(inspect(error_));
        throw error_;
    }
}

suite('Utils: validators #no-pack');

before(async function () {
    await factory.cleanup();
});

test('Positive: Date', function () {
    [
        dayjs().toISOString(),
        dayjs(),
        dayjs().valueOf(),
        dayjs().toDate(),
        new Date()
    ].forEach(inp =>
        testLIVR(inp, 'date', { valid : out => {
            assert.equal(out.toISOString, dayjs(inp).toISOString);
        } }));

    [
        null,
        undefined,
        ''
    ].forEach(inp =>
        testLIVR(inp, 'date', { valid : out => {
            assert.equal(inp, out);
        } }));
});

test('Negative: Date', function () {
    [
        'date',
        '15.03',
        '26.05.2007'
    ].forEach(inp =>
        testLIVR(inp, 'date', { error: 'WRONG_DATE' }));
});
