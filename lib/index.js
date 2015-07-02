var slug = require('slug');
var external = module.exports;
var KNOWN_NAMES = require('./known_names');

external.CYRILLIC_LANGUAGES = ['ru', 'uk', 'bg', 'be'];

external.getCyrillicLanguages = function() {
  return external.CYRILLIC_LANGUAGES;
};

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
 * Create a uniquename from a text
 */
external.uniquename = external.uniqueName = function(text) {
  if (!text) return;
  text = text.trim();

  if (text.length < 1) return;

  text = text.toLowerCase();

  if (KNOWN_NAMES[text]) text = KNOWN_NAMES[text];

  text = text.replace(/[\.]/g, '');

  text = text.trim();

  text = external.atonic(text);

  // accepted chars
  text = text.replace(/[^\u0030-\u0039\u0041-\u005A\u0061-\u007A\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF\u0100-\u017F\u0180-\u01BF\u01C4-\u024F\u1E02-\u1EF3\u0386-\u03FF\u0400-\u0481\u048A-\u04FF]/g, ' ');

  text = text.replace(/ /g, '-');
  text = text.replace(/-{2,}/g, '-');
  text = text.replace(/^-/, '').replace(/-$/, '');

  return text;
};

external.cultureUniqueName = function(uname, lang, country) {
  var culture = [lang];
  if (country) culture.push(country);
  return uname + '__' + culture.join('-').toLowerCase();
};

external.parseCultureUniqueName = function(uname) {
  var result = /^\S{2,}__(\w{2})(-\w{2})?$/.exec(uname);
  if (result) {
    var item = {
      name: result[1],
      lang: result[2]
    };
    if (result.length > 4) {
      item.country = result[4];
    }
    return item;
  }
};

external.isCultureUniqueName = function(uname) {
  return !!external.parseCultureUniqueName(uname);
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
