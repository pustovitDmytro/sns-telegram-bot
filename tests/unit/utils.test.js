import { assert } from 'chai';
import { dumpCommand } from 'utils';
import factory from '../Test';

suite('Utils');

before(async function () {
    await factory.cleanup();
});

test('parse telegram commands', async function () {
    assert.deepOwnInclude(dumpCommand('/url "my cool template"'), {
        command  : 'url',
        template : 'my cool template'
    });
});
