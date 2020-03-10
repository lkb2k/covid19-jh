import fetch from 'node-fetch'
import csv from 'csv-parser'

let url = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv';


var data = [];

fetch(url).then(res => {
  res.body.pipe(csv())
  .on('data', row => {
    data.push(row);
  })
  .on('end', () => console.log(data));
});
