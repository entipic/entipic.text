var slug = require('slug');
var external = module.exports;
var KNOWN_NAMES = require('./known_names');

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
    text = text.trim();
    text = text.toLowerCase();

    if (KNOWN_NAMES[text]) text = KNOWN_NAMES[text];

    text = text
      .replace(/[\+<>&\|]+/g, ' ')
      .replace(/[\$]+/g, ' dollar ')
      .replace(/_/g, ' ');
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


external.removeDiacritics = function(text) {
  return require('diacritics').remove(text);
};

external.atonic = function(text) {
  if (!text) return text;

  text = external.removeDiacritics(text);

  return text.replace(/[^\u0000-\u007e]/g, function(c) {
    return ATONICS[c] || c;
  });
};

function isNull(target) {
  return [undefined, null].indexOf(target) > -1;
}

var ATONICS = {
  Ё: 'Е',
  ё: 'е',
  Й: 'И',
  й: 'и'
};
