import fetch from 'node-fetch'
import csv from 'csv-parser'
import Dataset from './dataset.js'

let url = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv';

function country(countries, cb) {
  var data = new Dataset();
  fetch(url).then(res => {
    res.body.pipe(csv())
    .on('data', row => {
      data.push(row);
    })
    .on('end', () => {
      let results = countries.map((name) => data.country(name));
      console.log(results);
      cb(results);
    })    
  });
}

exports.country = country


