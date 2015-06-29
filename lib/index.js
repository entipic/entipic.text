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
external.uniquename = external.uniqueName = function(text) {
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

external.cultureUniqueName = function(uname, lang, country) {
  return uname + '__' + [lang, country].join('-').toLowerCase();
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

external.isCyrillic = function(text) {
  if (!text) return false;
  text = text.toLowerCase();
  return RUSSIAN_LETTER_REG.test(text);
};

external.isRussian = function(text) {
  return external.isCyrillic(text);
};

function isNull(target) {
  return [undefined, null].indexOf(target) > -1;
}

var RUSSIAN_LETTERS = 'а,б,в,г,д,е,ё,ж,з,и,й,к,л,м,н,о,п,р,с,т,у,ф,х,ц,ч,ш,щ,ъ,ы,ь,э,ю,я'.split(',');
var RUSSIAN_LETTER_REG = new RegExp(RUSSIAN_LETTERS.join('|'), 'gi');

var ATONICS = {
  Ё: 'Е',
  ё: 'е',
  Й: 'И',
  й: 'и'
};
