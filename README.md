# JS API for parsing the Johns Hopkins Covid-19 Timeseries data

So far this is pretty barebones, it just grabs the raw csv data from the JH github repo, parses the CSV and converts a given country into an image-chart link.  It does combine all the US county-level data into a single country.

## NOTE:
I wrote the module in ES6 syntax and am using babel to generate the ES2015 node module, but I'm not currently publishing it to NPM. That means if you commit a change to src/*.js you need to run ```npm run build``` before you commit, or anyone (symon) using this module won't see the changes you made.

## Next Steps

* Query both the 'confirmed cases' and 'deaths' data and create a stacked bar chart
* Add support for querying the state/county level US data
* Add support for aggregating the China data

