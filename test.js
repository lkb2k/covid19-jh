var covid = require('./lib')

covid.country(['US', 'italy', 'united kingdom'], (data) => {
    console.log(data.map(c => {
        return {
            country: c.name,
            deaths: c.chart('deaths'),
            cases: c.chart('cases')
        }
    }));
});
