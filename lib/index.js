"use strict";

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _csvParser = _interopRequireDefault(require("csv-parser"));

var _dataset = _interopRequireDefault(require("./dataset.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function country(countries, cb) {
  Promise.all([new Promise(function (resolve, reject) {
    var data = new _dataset["default"]();
    var url = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';
    (0, _nodeFetch["default"])(url).then(function (res) {
      res.body.pipe((0, _csvParser["default"])()).on('data', function (row) {
        data.push('cases', row);
      }).on('end', function () {
        return resolve(data);
      });
    });
  }), new Promise(function (resolve, reject) {
    var data = new _dataset["default"]();
    var url = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv';
    (0, _nodeFetch["default"])(url).then(function (res) {
      res.body.pipe((0, _csvParser["default"])()).on('data', function (row) {
        data.push('deaths', row);
      }).on('end', function () {
        return resolve(data);
      });
    });
  })]).then(function (results) {
    var data = results.reduce(function (a, b) {
      return a.merge(b);
    });
    cb(countries.map(function (c) {
      return data.country(c);
    }).filter(function (d) {
      return d != undefined;
    }));
  });
}

exports.country = country;