import { readFileSync } from 'fs';
import { join } from 'path';

import Papa from 'papaparse';

import { parseRefractiveIndex } from '../parseRefractiveIndex';

describe('parseRefractiveIndex', () => {
  it('simple values', () => {
    let entries = Papa.parse(
      readFileSync(join(__dirname, 'refractiveIndex.csv'), 'utf8'),
      {
        header: true,
        dynamicTyping: true,
      },
    ).data;

    for (let entry of entries) {
      for (let key in entry) {
        if (entry[key] === null) delete entry[key];
      }
      let result = parseRefractiveIndex(entry.value, {
        temperature: { defaultValue: 20 },
      });
      expect(result.value.low).toStrictEqual(entry.low);
      expect(result.value.high).toStrictEqual(entry.high);
      expect(result.temperature.low).toStrictEqual(entry.temperature || 20);
    }
  });

  it('1.15', () => {
    let result = parseRefractiveIndex('1.15', {
      temperature: {
        defaultUnits: '°C',
        optional: true,
      },
    });
    expect(result).toStrictEqual({
      value: { low: 1.15, high: undefined, units: undefined },
      temperature: {},
    });
  });
});
