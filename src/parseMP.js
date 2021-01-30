import { parseNumbersUnit } from './parseNumbersUnit';

/**
 *
 * @param {String} string
 * @param {object} [options={}]
 * @param {string} [options.defaultUnit]
 * @param {string} [options.targetUnit]
 */
export function parseMP(string, options = {}) {
  string = String(string).replace(/ /g, '').replace(/,/g, '.');

  return parseNumbersUnit(string, options.temperature);
}
