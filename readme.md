# entipic text

Entipic slug & uniquename module

## Interface

- `uniqueName`(text) - generate a topic unique name from a text;
  + Throws _Invalid uniquename error_
- `cultureUniqueName`(uniquename, lang, country) - format a _culture_ unique name from a text;
  + Throws _Invalid uniquename param_
- `parseCultureUniqueName`(uniquename) - parse a formated culture unique name: ios__en-us -> {name: 'ios', lang: 'en', country: 'us'};
- `isCultureUniqueName`(uniquename) - detect if a unique name is a _culture_ unique name;
- `atonic`(text) - remove text accents;
- `isCyrillic`(text) - detects if a text is cyrillic;
