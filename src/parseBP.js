import { parseNumbersUnit } from './parseNumbersUnit';

/**
 *
 * @param {String} string
 * @param {object} [options={}]
 * @param {object} [options.temperature={}]
 * @param {string} [options.temperature.defaultUnit]
 * @param {string} [options.temperature.targetUnit]
 * @param {object} [options.pressure={}]
 * @param {number} [options.pressure.defaultValue]
 * @param {string} [options.pressure.defaultUnit]
 * @param {string} [options.pressure.targetUnit]
 */
export function parseBP(string, options = {}) {
  let parts = String(string).split(/[@/]|, /);

  return {
    temperature: parseNumbersUnit(parts[0], options.temperature),
    pressure: parseNumbersUnit(parts[1], options.pressure),
  };
}
