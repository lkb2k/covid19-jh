var covid = require('./lib')

covid.country('US', (data) => {
    console.log(data);
});
