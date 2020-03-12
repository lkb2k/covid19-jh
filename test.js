var covid = require('./lib')

covid.country(['US', 'italy'], (data) => {
    console.log(data.map(c => { 
        return {
            country:c.country,
            chart:c.chart() 
        }
    }));
});
