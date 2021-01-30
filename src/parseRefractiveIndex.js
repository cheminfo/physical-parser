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
export function parseRefractiveIndex(string, options = {}) {
  let parts = String(string).split(/[@/]|, /);

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
