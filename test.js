var covid = require('./lib')

covid.country(['US', 'italy'], (data) => {
    console.log(data.map(c => c.chart()));
});
