import { assert } from 'chai';
import { dumpCommand, resolveUrl } from 'utils';
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

test('resolve url', function () {
    assert.equal(
        resolveUrl(null, 'http://google.com').href,
        'http://google.com/'
    );
});
