import { parseNumbersUnits } from './parseNumbersUnits';

/**
 *
 * @param {String} string
 * @param {object} [options={}]
 * @param {object} [options.temperature={}]
 * @param {string} [options.temperature.defaultUnits]
 * @param {string} [options.temperature.targetUnits]
 * @param {object} [options.pressure={}]
 * @param {number} [options.pressure.defaultValue]
 * @param {string} [options.pressure.defaultUnits]
 * @param {string} [options.pressure.targetUnits]
 */
export function parseBP(string, options = {}) {
  let parts = String(string).split(/[@/]|, /);

  return {
    temperature: parseNumbersUnits(parts[0], options.temperature),
    pressure: parseNumbersUnits(parts[1], options.pressure),
  };
}
