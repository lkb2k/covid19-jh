"use strict";

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _csvParser = _interopRequireDefault(require("csv-parser"));

var _dataset = _interopRequireDefault(require("./dataset.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var url = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv';

function country(name, cb) {
  var data = new _dataset["default"]();
  (0, _nodeFetch["default"])(url).then(function (res) {
    res.body.pipe((0, _csvParser["default"])()).on('data', function (row) {
      data.push(row);
    }).on('end', function () {
      return cb(data.country(name));
    });
  });
}

exports.country = country;