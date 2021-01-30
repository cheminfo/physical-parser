const Qty = require('js-quantities');

/**
 * Parse a string that may contain min / max and units values
 * @param {string} string
 * @param {object} [options={}]
 * @param {number} [options.defaultValue]
 * @param {string} [options.defaultUnits]
 * @param {string} [options.targetUnits]
 * @param {string} [options.optional=false] Is this value optional. Would through an error if empty and not optional
 */
export function parseNumbersUnits(string = '', options = {}) {
  const {
    defaultUnits = undefined,
    targetUnits = undefined,
    defaultValue = undefined,
    optional = false,
  } = options;
  let normalized = String(string).replace(/ /g, '').replace(/,/g, '.');
  if (optional && !normalized) return {};
  let splitter = /^([0-9.Ee-]*)([a-zA-Z °]*)$/;
  if (!normalized.match(splitter)) {
    throw Error(`Can not parseNumbersUnits of: ${string}`);
  }

  let numbers = normalized.replace(splitter, '$1');
  let units = normalized.replace(splitter, '$2').trim();

  let low;
  let high;

  if (numbers === '') {
    if (defaultValue) {
      numbers = String(defaultValue).replace(/ /g, '');
    } else {
      throw Error(`Can not parseNumbersUnits of: ${string}`);
    }
  }

  if (numbers.includes('--')) {
    // -5--4
    low = Number(numbers.split('--')[0]);
    high = Number(`-${numbers.split('--')[1]}`);
  } else if (numbers.startsWith('-')) {
    // -5 or -1-1 (minus 1 to plus 1)
    let subparts = numbers.split('-');
    switch (subparts.length) {
      case 2:
        low = Number(numbers);
        break;
      case 3:
        low = Number(`-${subparts[1]}`);
        high = Number(+subparts[2]);
        break;
      default:
        throw new Error(`Can not parse: ${string}`);
    }
  } else {
    let subparts = numbers.split('-');
    low = subparts[0] !== '' ? Number(subparts[0]) : undefined;
    high = subparts[1] !== undefined ? Number(subparts[1]) : undefined;
  }

  if (!units) units = defaultUnits;

  // Should we convert the units
  if (targetUnits) {
    let convert = Qty.swiftConverter(
      units.replace(/°/g, 'temp'),
      targetUnits.replace(/°/g, 'temp'),
    );

    if (low !== undefined) {
      low = convert(low);
    }
    if (high !== undefined) {
      high = convert(high);
    }
    units = targetUnits;
  }

  return {
    low,
    high,
    units,
  };
}
