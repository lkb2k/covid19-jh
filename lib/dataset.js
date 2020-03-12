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

var Country = /*#__PURE__*/function () {
  function Country(json) {
    _classCallCheck(this, Country);

    this.country = json['Country/Region'];
    this.dates = this.extractDates(json);
  }

  _createClass(Country, [{
    key: "extractDates",
    value: function extractDates(row) {
      return Object.keys(row).filter(function (key) {
        return isDate(key);
      }).map(function (key) {
        return {
          "day": key,
          "count": extractNumber(row[key])
        };
      });
    }
  }, {
    key: "combine",
    value: function combine(country) {
      var _this = this;

      country.dates.forEach(function (a) {
        var day = _this.dates.find(function (b) {
          return a.day === b.day;
        });

        day.count += extractNumber(a.count);
      });
    }
  }, {
    key: "chart",
    value: function chart() {
      var fortnight = this.dates.slice(this.dates.length - 21);
      var points = fortnight.map(function (d) {
        return d.count;
      });
      var dates = fortnight.map(function (d) {
        return d.day.substr(0, d.day.lastIndexOf('/'));
      });
      var encodedCountry = encodeURIComponent(this.country);
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
    value: function country(_country) {
      return this.countries.get(_country.toLowerCase());
    }
  }, {
    key: "push",
    value: function push(data) {
      var row = new Country(data);
      var key = row.country.toLowerCase();

      if (this.countries.has(key)) {
        this.countries.get(key).combine(row);
      } else {
        this.countries.set(key, row);
      }
    }
  }]);

  return Dataset;
}();

exports["default"] = Dataset;