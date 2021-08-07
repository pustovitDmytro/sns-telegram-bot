
import { assert } from 'chai';
import factory, { load } from '../Test';

const { ACTION_NOT_PERMITTED, VALIDATION_FAILED, TG_ERROR, default:X } = load('error');

suite('Utils: Errors');

before(async function () {
    await factory.cleanup();
});

function ErrorTester(error, render) {
    try {
        throw error;
    } catch (error_) {
        assert.deepEqual(
            X.render(error_),
            render
        );
    }
}

test('ACTION_NOT_PERMITTED', function () {
    ErrorTester(
        new ACTION_NOT_PERMITTED(),
        {
            code    : 'PERMISSION_DENIED',
            message : 'user not permitted for this action'
        }
    );
});

test('VALIDATION_FAILED', function () {
    ErrorTester(
        new VALIDATION_FAILED({ name: 'TOO_SHORT' }),
        {
            'code'    : 'FORMAT_ERROR',
            'fields'  : { 'name': 'TOO_SHORT' },
            'message' : 'validation failed'
        }
    );
});

test('TG_ERROR', function () {
    ErrorTester(
        new TG_ERROR({ message: 'Error 404' }),
        {
            'code'    : 'TELEGRAM_API_ERROR',
            'message' : 'Error 404'
        }
    );
});

test('UNKNOWN_ERROR', function () {
    ErrorTester(
        new Error('unknown error'),
        {
            'code'    : 'INTERNAL_SERVER_ERROR',
            'message' : 'UNKNOWN_ERROR'
        }
    );
});
