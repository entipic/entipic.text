var slug = require('slug');
var external = module.exports;

/**
 * Create a slug from a text
 */
external.slug = function(text, options) {
  options = options || {};
  //options.symbols = isNull(options.symbols) ? false : options.symbols;
  options.lower = isNull(options.lower) ? true : options.lower;
  options.multicharmap = isNull(options.multicharmap) ? {} : options.multicharmap;
  var min = isNull(options.min) ? 1 : options.min;
  if (min) {
    if (!text || text.trim().length < min) throw new TypeError('Ivalid text');
    text = text.trim();
  }
  var result = slug(text, options);

  result = result.replace(/^-/, '').replace(/-$/, '');

  return result;
};

/**
 * Create a uniquename form a text
 */
external.uniquename = function(text) {
  if (text) {
    text = text.toLowerCase();

    if (KNOWN_NAMES[text]) return KNOWN_NAMES[text];

    text = text
      .replace(/[\+<>&\|]+/g, ' ')
      .replace(/[\$]+/g, ' dollar ');


  }
  var min = 2;
  var result = external.slug(text, {
    min: min
  });

  if (result.length < min) {
    throw new TypeError('Ivalid uniquename');
  }

  return result;
};

function isNull(target) {
  return [undefined, null].indexOf(target) > -1;
}

/**
 * Known names
 */
var KNOWN_NAMES = {
  'c++': 'c-plus-plus',
  'c#': 'c-sharp'
};
