# parse-physical

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

Try to parse a string containing physical data like bp, mp.

## Installation

`$ npm i parse-physical`

## Usage

```js
import { parseBP, parseMP, parseNumbersUnit } from 'parse-physical';

let bp = parseBP('100-120 @ 50 mmHg', {
  temperature: {
    defaultUnit: '°C'
  }
  pressure: {
    defaultValue: 760,
    defaultUnit: 'mmHg'
  }
})

// bp: {temperature: {low: 100, high: 120, unit: '°C'}, pressure: {low: 50, unit: 'mmHg'}};

let density = parseNumbersUnit('1.5-1.51', {
  defaultUnit: 'g/mL'
})

// density: {low: 1.5, high: 1.51, unit: 'g/mL'}


```

## [API Documentation](https://cheminfo.github.io/parse-physical/)

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/parse-physical.svg
[npm-url]: https://www.npmjs.com/package/parse-physical
[ci-image]: https://github.com/cheminfo/parse-physical/workflows/Node.js%20CI/badge.svg?branch=master
[ci-url]: https://github.com/cheminfo/parse-physical/actions?query=workflow%3A%22Node.js+CI%22
[codecov-image]: https://img.shields.io/codecov/c/github/cheminfo/parse-physical.svg
[codecov-url]: https://codecov.io/gh/cheminfo/parse-physical
[download-image]: https://img.shields.io/npm/dm/parse-physical.svg
[download-url]: https://www.npmjs.com/package/parse-physical
