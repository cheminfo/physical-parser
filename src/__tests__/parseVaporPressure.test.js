import { readFileSync } from 'fs';
import { join } from 'path';

import Papa from 'papaparse';

import { parseVaporPressure } from '../parseVaporPressure';

describe('parseVaporPressure', () => {
  it('simple values', () => {
    let entries = Papa.parse(
      readFileSync(join(__dirname, 'vaporPressure.csv'), 'utf8'),
      {
        header: true,
        dynamicTyping: true,
      },
    ).data;

    for (let entry of entries) {
      for (let key in entry) {
        if (entry[key] === null) delete entry[key];
      }
      let result = parseVaporPressure(entry.value, {
        temperature: {
          optional: true,
        },
      });
      expect(result.pressure.low).toBeCloseTo(entry.low);
      expect(result.pressure.units).toStrictEqual(entry.units);
      expect(result.temperature.low).toStrictEqual(entry.temperature);
      expect(result.temperature.units).toStrictEqual(entry.temperatureUnits);
    }
  });
});
