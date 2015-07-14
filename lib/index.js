'use strict';

var atonic = require('atonic');
var external = module.exports;
var KNOWN_NAMES = require('./known_names');
var XRegExp = require('xregexp').XRegExp;
/*eslint new-cap:0*/
var UNIQUENAME_REPLACES = XRegExp('[^\\p{N}\\p{L}-]', 'g');

external.CYRILLIC_LANGUAGES = ['ru', 'uk', 'bg', 'be'];

var RUSSIAN_LETTERS = 'а,б,в,г,д,е,ё,ж,з,и,й,к,л,м,н,о,п,р,с,т,у,ф,х,ц,ч,ш,щ,ъ,ы,ь,э,ю,я'.split(',');
var RUSSIAN_LETTER_REG = new RegExp(RUSSIAN_LETTERS.join('|'), 'gi');

external.getCyrillicLanguages = function() {
	return external.CYRILLIC_LANGUAGES;
};

/**
 * Create a uniquename from a text
 */
external.uniquename = external.uniqueName = function(text) {
	if (!text) {
		throw new Error('Invalid uniquename text: ' + text);
	}
	text = text.trim();

	if (text.length < 1) {
		throw new Error('Invalid uniquename text: ' + text);
	}

	text = text.toLowerCase();

	if (KNOWN_NAMES[text]) {
		text = KNOWN_NAMES[text];
	}

	text = text.replace(/[\.]/g, '');

	text = text.trim();

	text = atonic.lowerCase(text);
	text = XRegExp.replace(text, UNIQUENAME_REPLACES, ' ');

	text = text.replace(/[ ]+/g, '-');
	text = text.replace(/-{2,}/g, '-');
	text = text.replace(/^-/, '').replace(/-$/, '');

	if (text.length < 2) {
		throw new Error('Invalid uniquename(too short): ' + text);
	}

	return text;
};

external.cultureUniqueName = function(uname, lang, country) {
	if (!uname || uname.trim().length < 2) {
		throw new Error('Invalid uname param:' + uname);
	}
	var culture = [lang];
	if (country) {
		culture.push(country);
	}
	return uname + '__' + culture.join('-').toLowerCase();
};

external.parseCultureUniqueName = function(uname) {
	var result = /^(\S{2,})__(\w{2})(-(\w{2}))?$/.exec(uname);
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
	return atonic(text);
};

external.atonic = function(text, names) {
	if (!text) {
		return text;
	}

	return atonic(text, names);
};

external.isCyrillic = function(text) {
	if (!text) {
		return false;
	}
	text = text.toLowerCase();
	return RUSSIAN_LETTER_REG.test(text);
};

external.isRussian = function(text) {
	return external.isCyrillic(text);
};
