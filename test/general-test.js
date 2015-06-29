var assert = require('chai').assert;
var instance = require('../lib');

describe('general', function() {
  it('isCyrillic("abc c24#$$%%+)")==false', function() {
    assert.equal(instance.isCyrillic('abc c24#$$%%+)'), false);
  });
  it('isCyrillic("Начиная с версии Юникода")==true', function() {
    assert.equal(instance.isCyrillic('Начиная с версии Юникода'), true);
  });
});
