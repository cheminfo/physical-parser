import { parseNumbersUnit } from './parseNumbersUnit';

/**
 *
 * @param {String} string
 * @param {object} [options={}]
 * @param {object} [options.value={}]
 * @param {string} [options.value.defaultUnit]
 * @param {string} [options.value.targetUnit]
 * @param {object} [options.temperature={}]
 * @param {number} [options.temperature.defaultValue]
 * @param {string} [options.temperature.defaultUnit]
 * @param {string} [options.temperature.targetUnit]
 */
export function parseDensity(string, options = {}) {
  let parts = String(string).split(/[@/]|, /);

  let value = parts[0];
  let temperature = parts[1];
  if (temperature) {
    temperature = temperature.replace(/ *t= */, '');
  }

  return {
    value: parseNumbersUnit(value, options.value),
    temperature: parseNumbersUnit(temperature, options.temperature),
  };
}
