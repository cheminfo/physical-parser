import { readFileSync } from 'fs';
import { join } from 'path';

import { toBeDeepCloseTo, toMatchCloseTo } from 'jest-matcher-deep-close-to';
import Papa from 'papaparse';

import { parseNumbersUnit } from '../parseNumbersUnit';

expect.extend({ toBeDeepCloseTo, toMatchCloseTo });

describe('parseNumbersUnit', () => {
  it('list of simple values', () => {
    let entries = Papa.parse(
      readFileSync(join(__dirname, 'numbersUnit.csv'), 'utf8'),
      {
        header: true,
        dynamicTyping: true,
      },
    ).data;

    for (let entry of entries) {
      for (let key in entry) {
        if (entry[key] === null) delete entry[key];
      }
      let result = parseNumbersUnit(entry.value);
      expect(result.low).toStrictEqual(entry.low);
      expect(result.high).toStrictEqual(entry.high);
      expect(result.unit).toStrictEqual(entry.unit);
    }
  });
  it('defaultUnit', () => {
    expect(parseNumbersUnit('10-20K', { defaultUnit: '°C' })).toStrictEqual({
      low: 10,
      high: 20,
      unit: 'K',
    });
    expect(parseNumbersUnit('10-20', { defaultUnit: '°C' })).toStrictEqual({
      low: 10,
      high: 20,
      unit: '°C',
    });
  });
  it('targetUnit', () => {
    expect(
      parseNumbersUnit('10-20 °K', {
        defaultUnit: '°C',
        targetUnit: '°K',
      }),
    ).toStrictEqual({
      low: 10,
      high: 20,
      unit: '°K',
    });
    expect(
      parseNumbersUnit('10-20', { defaultUnit: '°K', targetUnit: '°C' }),
    ).toMatchCloseTo({
      low: -263.15,
      high: -253.15,
      unit: '°C',
    });
  });

  it('defaultValue', () => {
    expect(
      parseNumbersUnit('°K', {
        defaultValue: 123,
      }),
    ).toStrictEqual({
      low: 123,
      high: undefined,
      unit: '°K',
    });
    expect(
      parseNumbersUnit('', {
        defaultValue: '-125--123',
        defaultUnit: '°C',
      }),
    ).toStrictEqual({
      low: -125,
      high: -123,
      unit: '°C',
    });
  });

  it('special cases', () => {
    expect(() => parseNumbersUnit('<19')).toThrow(
      'Can not parseNumbersUnit of: <19',
    );

    expect(() => parseNumbersUnit('none')).toThrow(
      'Can not parseNumbersUnit of: none',
    );
  });
});
