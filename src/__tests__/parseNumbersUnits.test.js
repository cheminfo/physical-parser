import { readFileSync } from 'fs';
import { join } from 'path';

import { toBeDeepCloseTo, toMatchCloseTo } from 'jest-matcher-deep-close-to';
import Papa from 'papaparse';

import { parseNumbersUnits } from '../parseNumbersUnits';

expect.extend({ toBeDeepCloseTo, toMatchCloseTo });

describe('parseNumbersUnits', () => {
  it('list of simple values', () => {
    let entries = Papa.parse(
      readFileSync(join(__dirname, 'numbersUnits.csv'), 'utf8'),
      {
        header: true,
        dynamicTyping: true,
      },
    ).data;

    for (let entry of entries) {
      for (let key in entry) {
        if (entry[key] === null) delete entry[key];
      }
      let result = parseNumbersUnits(entry.value);
      expect(result.low).toStrictEqual(entry.low);
      expect(result.high).toStrictEqual(entry.high);
      expect(result.units).toStrictEqual(entry.units);
    }
  });
  it('defaultUnits', () => {
    expect(parseNumbersUnits('10-20K', { defaultUnits: '°C' })).toStrictEqual({
      low: 10,
      high: 20,
      units: 'K',
    });
    expect(parseNumbersUnits('10-20', { defaultUnits: '°C' })).toStrictEqual({
      low: 10,
      high: 20,
      units: '°C',
    });
  });
  it('targetUnits', () => {
    expect(
      parseNumbersUnits('10-20 °K', {
        defaultUnits: '°C',
        targetUnits: '°K',
      }),
    ).toStrictEqual({
      low: 10,
      high: 20,
      units: '°K',
    });
    expect(
      parseNumbersUnits('10-20', { defaultUnits: '°K', targetUnits: '°C' }),
    ).toMatchCloseTo({
      low: -263.15,
      high: -253.15,
      units: '°C',
    });
  });

  it('defaultValue', () => {
    expect(
      parseNumbersUnits('°K', {
        defaultValue: 123,
      }),
    ).toStrictEqual({
      low: 123,
      high: undefined,
      units: '°K',
    });
    expect(
      parseNumbersUnits('', {
        defaultValue: '-125--123',
        defaultUnits: '°C',
      }),
    ).toStrictEqual({
      low: -125,
      high: -123,
      units: '°C',
    });
  });

  it('special cases', () => {
    expect(() => parseNumbersUnits('<19')).toThrow(
      'Can not parseNumbersUnits of: <19',
    );

    expect(() => parseNumbersUnits('none')).toThrow(
      'Can not parseNumbersUnits of: none',
    );
  });
});
