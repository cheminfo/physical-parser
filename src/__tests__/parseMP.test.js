import { readFileSync } from 'fs';
import { join } from 'path';

import Papa from 'papaparse';

import { parseMP } from '../parseMP';

describe('parseMP', () => {
  it('simple values', () => {
    let entries = Papa.parse(readFileSync(join(__dirname, 'mp.csv'), 'utf8'), {
      header: true,
      dynamicTyping: true,
    }).data;

    for (let entry of entries) {
      for (let key in entry) {
        if (entry[key] === null) delete entry[key];
      }
      let result = parseMP(entry.value);
      expect(result.low).toStrictEqual(entry.low);
      expect(result.high).toStrictEqual(entry.high);
      expect(result.unit).toStrictEqual(entry.unit);
    }
  });

  it('110-120', () => {
    let result = parseMP('110-120', {
      temperature: {
        defaultUnit: '°C',
      },
    });
    expect(result).toStrictEqual({ low: 110, high: 120, unit: '°C' });
  });

  it('110-120', () => {
    let result = parseMP('110-120', {
      temperature: {
        defaultUnit: '°C',
        targetUnit: '°K',
      },
      pressure: {
        targetUnit: 'mbar',
      },
    });
    expect(result).toStrictEqual({ low: 383.15, high: 393.15, unit: '°K' });
  });
});
