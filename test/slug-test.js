var assert = require('chai').assert;
var instance = require('../lib');

describe('slug', function() {
  it('null - should throw a TypeError', function() {
    assert.throws(function() {
      instance.slug(null);
    }, TypeError);
  });
  it('undefined - should throw a TypeError', function() {
    assert.throws(function() {
      instance.slug();
    }, TypeError);
  });
  it('empty - should throw a TypeError', function() {
    assert.throws(function() {
      instance.slug('');
    }, TypeError);
    assert.throws(function() {
      instance.slug('   ');
    }, TypeError);
  });
  it('too small text - should throw a TypeError', function() {
    assert.throws(function() {
      instance.slug('1  ', {
        min: 2
      });
    }, TypeError);
  });

  it('`C++` = `c`', function() {
    assert.equal('c', instance.slug('C++'));
  });

  it('`C#` = `c`', function() {
    assert.equal('c', instance.slug('C#'));
  });

  it('`Node.js` = `nodejs`', function() {
    assert.equal('nodejs', instance.slug('Node.js'));
  });

  it('`M;.. ,,șțăîăȚȘKJhj` = `m-staiatskjhj`', function() {
    assert.equal('m-staiatskjhj', instance.slug('M;.. ,,șțăîăȚȘKJhj'));
  });

  it('`длллр [    ётХЗДЖДрапр><?":{$:"| $#!@сеВКУ+=ЦУЫСМ\nj...--` = `dlllr-yothzdzhdraprgreaterlessdollaror-dollarsevkucuysm-j`', function() {
    assert.equal('dlllr-yothzdzhdraprgreaterlessdollaror-dollarsevkucuysm-j', instance.slug('длллр [    ётХЗДЖДрапр><?":{$:"| $#!@сеВКУ+=ЦУЫСМ\nj...--'));
  });

});
