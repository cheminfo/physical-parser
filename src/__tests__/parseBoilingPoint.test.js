import { readFileSync } from 'fs';
import { join } from 'path';

import Papa from 'papaparse';

import { parseBoilingPoint } from '../parseBoilingPoint';

describe('parseBoilingPoint', () => {
  it('simple values', () => {
    let entries = Papa.parse(
      readFileSync(join(__dirname, 'boilingPoint.csv'), 'utf8'),
      {
        header: true,
        dynamicTyping: true,
      },
    ).data;

    for (let entry of entries) {
      for (let key in entry) {
        if (entry[key] === null) delete entry[key];
      }
      let result = parseBoilingPoint(entry.value, {
        pressure: {
          defaultValue: 760,
          defaultUnits: 'torr',
          targetUnits: 'torr',
        },
      });
      expect(result.temperature.low).toStrictEqual(entry.low);
      expect(result.temperature.high).toStrictEqual(entry.high);
      expect(result.pressure.low).toBeCloseTo(entry.pressure || 760);
      expect(result.pressure.units).toStrictEqual(entry.pressureUnits);
    }
  });

  it('110-120 @ 50 torr', () => {
    let result = parseBoilingPoint('110-120 @ 50 torr', {
      temperature: {
        defaultUnits: '°C',
      },
    });
    expect(result).toStrictEqual({
      temperature: { low: 110, high: 120, units: '°C' },
      pressure: { low: 50, high: undefined, units: 'torr' },
    });
  });

  it('110-120 @ 50 torr with targetUnits', () => {
    let result = parseBoilingPoint('110-120 @ 50 torr', {
      temperature: {
        defaultUnits: '°C',
        targetUnits: '°K',
      },
      pressure: {
        targetUnits: 'mbar',
      },
    });
    expect(result).toStrictEqual({
      temperature: { low: 383.15, high: 393.15, units: '°K' },
      pressure: { low: 66.661184, high: undefined, units: 'mbar' },
    });
  });
});
