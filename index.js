
/**
 * Expose `parse`.
 */

module.exports = parse;

/**
 * Parse the given string of `xml`.
 *
 * @param {String} xml
 * @return {Object}
 * @api public
 */

function parse(xml) {
  return document();

  function document() {
    return {
      declaration: declaration(),
      root: root()
    }
  }

  function declaration() {
    if (!is('<?xml')) return;
    console.log(tag());
  }

  function tag() {
    var m = match(/^<(\S+)\s*/);
    if (!m) return;

    var tag = {
      name: m[1],
      attributes: {}
    };

    while (!(eos() || is('>') || is('?>'))) {
      var attr = attribute();
      if (!attr) return tag;

      tag.attributes[attr.name] = attr.value;
    }

    return tag;
  }

  function attribute() {
    var m = match(/([\w:]+)\s*=\s*("[^"]*"|'[^']*'|\w+)\s*/);
    if (!m) return;
    return { name: m[1], value: strip(m[2]) }
  }

  function strip(val) {
    return val.replace(/^['"]|['"]$/g, '');
  }

  function match(re) {
    var m = xml.match(re);
    if (!m) return;
    xml = xml.slice(m[0].length);
    return m;
  }

  function eos() {
    return 0 == xml.length;
  }

  function is(prefix) {
    return 0 == xml.indexOf(prefix);
  }
}