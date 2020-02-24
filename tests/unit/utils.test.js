import { assert } from 'chai';
import { dumpCommand, resolveUrl } from 'src/utils';
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

test('resolve url', () => {
    assert.equal(
        resolveUrl(null, 'http://google.com').href,
        'http://google.com/'
    );
});
