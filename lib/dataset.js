"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var isDate = function isDate(date) {
  return new Date(date) !== "Invalid Date" && !isNaN(new Date(date));
};

var extractNumber = function extractNumber(str) {
  return !str || isNaN(str) ? 0 : parseInt(str);
};

var extractDataPoints = function extractDataPoints(outcome, row) {
  return Object.keys(row).filter(function (key) {
    return isDate(key);
  }).map(function (date) {
    return new DataPoint(date).set(outcome, extractNumber(row[date]));
  });
};

var DataPoint = /*#__PURE__*/function () {
  function DataPoint(date) {
    _classCallCheck(this, DataPoint);

    this.date = date;
  }

  _createClass(DataPoint, [{
    key: "set",
    value: function set(outcome, count) {
      this[outcome] = count;
      return this;
    }
  }, {
    key: "add",
    value: function add(dataPoint) {
      var _this = this;

      Object.keys(dataPoint).forEach(function (prop) {
        if (!isNaN(dataPoint[prop])) {
          if (_this.hasOwnProperty(prop)) {
            _this[prop] += dataPoint[prop];
          } else {
            _this[prop] = dataPoint[prop];
          }
        }
      });
      return this;
    }
  }]);

  return DataPoint;
}();

var Country = /*#__PURE__*/function () {
  function Country(row) {
    _classCallCheck(this, Country);

    this.name = row['Country/Region'];
    this.dataPoints = [];
  }

  _createClass(Country, [{
    key: "add",
    value: function add(dates) {
      var _this2 = this;

      if (this.dataPoints.length === 0) {
        this.dataPoints = dates;
      } else {
        dates.forEach(function (day) {
          _this2.dataPoints.find(function (existing) {
            return day.date === existing.date;
          }).add(day);
        });
      }

      return this;
    }
  }, {
    key: "chart",
    value: function chart(outcome) {
      var month = this.dataPoints.slice(this.dataPoints.length - 30);
      var points = month.map(function (d) {
        return d[outcome];
      });
      var dates = month.map(function (d) {
        return d.date.substr(0, d.date.lastIndexOf('/'));
      });
      var encodedCountry = encodeURIComponent("".concat(this.name, " (").concat(outcome, ")"));
      return "https://image-charts.com/chart?chtt=".concat(encodedCountry, "&chbh=a&chd=a:").concat(points.join(), "&chl=").concat(points.join("|"), "&chxl=0:|").concat(dates.join("|"), "|&chxt=x&chs=999x250&cht=bvg");
    }
  }]);

  return Country;
}();

var Dataset = /*#__PURE__*/function () {
  function Dataset() {
    _classCallCheck(this, Dataset);

    this.countries = new Map();
  }

  _createClass(Dataset, [{
    key: "country",
    value: function country(name) {
      return this.countries.get(name.toLowerCase());
    }
  }, {
    key: "push",
    value: function push(outcome, csv) {
      var country = new Country(csv);
      var series = extractDataPoints(outcome, csv);
      this.addData(country, series);
    }
  }, {
    key: "addData",
    value: function addData(country, series) {
      var key = country.name.toLowerCase();

      if (this.countries.has(key)) {
        this.countries.get(key).add(series);
      } else {
        this.countries.set(key, country.add(series));
      }
    }
  }, {
    key: "merge",
    value: function merge(dataset) {
      var _this3 = this;

      dataset.countries.forEach(function (country) {
        _this3.addData(country, country.dataPoints);
      });
      return this;
    }
  }]);

  return Dataset;
}();

exports["default"] = Dataset;