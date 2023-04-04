import { parseNumbersUnits } from './parseNumbersUnits';

/**
 *
 * @param {String} string
 * @param {object} [options={}]
 * @param {object} [options.value={}]
 * @param {string} [options.value.defaultUnits]
 * @param {string} [options.value.targetUnits]
 * @param {object} [options.temperature={}]
 * @param {number} [options.temperature.defaultValue]
 * @param {string} [options.temperature.defaultUnits]
 * @param {string} [options.temperature.targetUnits]
 */
export function parseDensity(string, options = {}) {
  string = String(string);
  string = string.replace(/\(.*/, '');
  string = string.replace('g/cu cm', 'g/cm^3');
  let parts = String(string).split(/[@]|, | at /);

  let value = parts[0];
  let temperature = parts[1];
  if (temperature) {
    temperature = temperature.replace(/ *t= */, '');
  }

  return {
    value: parseNumbersUnits(value, options.value),
    temperature: parseNumbersUnits(temperature, options.temperature),
  };
}
