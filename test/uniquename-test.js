var assert = require('chai').assert;
var instance = require('../lib');

describe('uniquename', function() {
  it('null - should be undefined', function() {
    assert.equal(instance.uniquename(null), undefined);
  });
  it('undefined - should be undefined', function() {
    assert.equal(instance.uniquename(), undefined);
  });
  it('empty - should be undefined', function() {
    assert.equal(instance.uniquename(''), undefined);
    assert.equal(instance.uniquename('    '), undefined);
  });
  it('too small text', function() {
    assert.throws(function() {
      assert.equal(instance.uniquename('1  '), '1');
    });
    assert.throws(function() {
      assert.equal(instance.uniquename('  a  '), 'a');
    });
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

  it('`A++`=`a` throw error', function() {
    assert.throws(function() {
      instance.uniquename('A++    ');
    });
  });

  it('`@A[/o~±ÆЙЖ_=?><`=`a-o-aeиж`', function() {
    assert.equal(instance.uniquename('@A[/o~±ÆЙЖ_=?><'), 'a-o-aeиж');
  });

  it('`Начиная с версии Юникода`=`начиная-с-версии-юникода`', function() {
    assert.equal(instance.uniquename('Начиная с версии Юникода'), 'начиная-с-версии-юникода');
  });

});
