var covid = require('./lib')

covid.country(['US', 'UK'], (data) => {
    console.log(data.map(c => c.chart()));
});
