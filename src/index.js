import fetch from 'node-fetch'
import csv from 'csv-parser'
import Dataset from './dataset.js'


function country(countries, cb) {
  

  Promise.all([
    new Promise((resolve, reject) => {
      var data = new Dataset();
      let url = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';
      fetch(url).then(res => {
        res.body.pipe(csv())
          .on('data', row => {
            data.push('cases', row);
          })
          .on('end',() => resolve(data));
      });
    }),
    new Promise((resolve, reject) => {
      var data = new Dataset();
      let url = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv';
      fetch(url).then(res => {
        res.body.pipe(csv())
          .on('data', row => {
            data.push('deaths', row);
          })
          .on('end',() => resolve(data));
      });
    })]
  ).then((results) => {    
      var data = results.reduce((a,b) => a.merge(b));
      cb(countries.map(c => data.country(c)).filter(d => d != undefined));
  });

}

exports.country = country


