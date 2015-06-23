var assert = require('chai').assert;
var instance = require('../lib');

describe('uniquename', function() {
  it('null - should throw a TypeError', function() {
    assert.throws(function() {
      instance.uniquename(null);
    }, TypeError);
  });
  it('undefined - should throw a TypeError', function() {
    assert.throws(function() {
      instance.uniquename();
    }, TypeError);
  });
  it('empty - should throw a TypeError', function() {
    assert.throws(function() {
      instance.uniquename('');
    }, TypeError);
    assert.throws(function() {
      instance.uniquename('   ');
    }, TypeError);
  });
  it('too small text - should throw a TypeError', function() {
    assert.throws(function() {
      instance.uniquename('1  ', {
        min: 2
      });
    }, TypeError);
    assert.throws(function() {
      instance.uniquename('a  ');
    }, TypeError);
  });

  it('`C++` = `c-plus-plus`', function() {
    assert.equal('c-plus-plus', instance.uniquename('C++'));
  });

  it('`C#` = `c-sharp`', function() {
    assert.equal('c-sharp', instance.uniquename('C#'));
  });

  it('`Node.js` = `nodejs`', function() {
    assert.equal('nodejs', instance.uniquename('Node.js'));
  });

  it('`A++` throws a TypeError', function() {
    assert.throws(function() {
      instance.uniquename('A++');
    }, TypeError);
  });

});
