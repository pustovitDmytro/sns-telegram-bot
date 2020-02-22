import { assert } from 'chai';
import { dumpCommand } from 'src/utils';
import factory from '../Test';

suite('Utils');

before(async () => {
    await factory.cleanup();
});

test('parse telegram commands', async () => {
    assert.deepOwnInclude(dumpCommand('/url "my cool template"'), {
        command  : 'url',
        template : 'my cool template'
    });
});

