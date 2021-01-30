import { readFileSync } from 'fs';
import { join } from 'path';

import Papa from 'papaparse';

import { parseBP } from '../parseBP';

describe('parseBP', () => {
  it('simple values', () => {
    let entries = Papa.parse(readFileSync(join(__dirname, 'bp.csv'), 'utf8'), {
      header: true,
      dynamicTyping: true,
    }).data;

    for (let entry of entries) {
      for (let key in entry) {
        if (entry[key] === null) delete entry[key];
      }
      let result = parseBP(entry.value, { pressure: { defaultValue: 760 } });
      expect(result.temperature.low).toStrictEqual(entry.low);
      expect(result.temperature.high).toStrictEqual(entry.high);
      expect(result.pressure.low).toStrictEqual(entry.pressure || 760);
    }
  });

  it('110-120 @ 50 torr', () => {
    let result = parseBP('110-120 @ 50 torr', {
      temperature: {
        defaultUnit: '°C',
      },
    });
    expect(result).toStrictEqual({
      temperature: { low: 110, high: 120, unit: '°C' },
      pressure: { low: 50, high: undefined, unit: 'torr' },
    });
  });

  it('110-120 @ 50 torr with targetUnit', () => {
    let result = parseBP('110-120 @ 50 torr', {
      temperature: {
        defaultUnit: '°C',
        targetUnit: '°K',
      },
      pressure: {
        targetUnit: 'mbar',
      },
    });
    expect(result).toStrictEqual({
      temperature: { low: 383.15, high: 393.15, unit: '°K' },
      pressure: { low: 66.661184, high: undefined, unit: 'mbar' },
    });
  });
});
