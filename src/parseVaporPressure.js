import { parseNumbersUnits } from './parseNumbersUnits';

/**
 *
 * @param {String} string
 * @param {object} [options={}]
 * @param {object} [options.temperature={}]
 * @param {string} [options.temperature.defaultUnits]
 * @param {string} [options.temperature.targetUnits]
 * @param {string} [options.pressure.optional]
 * @param {object} [options.pressure={}]
 * @param {string} [options.pressure.defaultUnits]
 * @param {string} [options.pressure.targetUnits]

 */
export function parseVaporPressure(string, options = {}) {
  let parts = String(string).split(/[@/]|, | at /);
  return {
    pressure: parseNumbersUnits(parts[0], options.pressure),
    temperature: parseNumbersUnits(parts[1], options.temperature),
  };
}
