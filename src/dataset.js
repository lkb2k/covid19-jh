var isDate = function(date) {
    return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}

var extractNumber = function(str) {
    return !str || isNaN(str) ? 0 : parseInt(str);
}

var extractDataPoints = function(outcome, row) {
    return Object.keys(row).filter(key => {
        return isDate(key);
    }).map(date => { 
        return new DataPoint(date).set(outcome, extractNumber(row[date]))
    });
}

class DataPoint {
    constructor(date) {
        this.date = date;        
    }

    set(outcome, count) {
        this[outcome] = count;
        return this;
    }

    add(dataPoint) {
        Object.keys(dataPoint).forEach(prop => {
            if(!isNaN(dataPoint[prop])) {
                if(this.hasOwnProperty(prop)) {
                    this[prop] += dataPoint[prop];
                }else{
                    this[prop] = dataPoint[prop];
                }
            }
        });

        return this;
    }
}


class Country {
    constructor(row) {
        this.name = row['Country/Region'];
        this.dataPoints = [];
    }

    add(dates) {        
        if(this.dataPoints.length === 0) {
            this.dataPoints = dates;
        } else {
            dates.forEach(day => {
                this.dataPoints.find(existing => day.date === existing.date).add(day);
            });
        }
        return this;
    }

    chart(outcome) {
        let month = this.dataPoints.slice(this.dataPoints.length -30);
        let points = month.map(d => d[outcome]);
        let dates = month.map(d => d.date.substr(0, d.date.lastIndexOf('/')));
        let encodedCountry = encodeURIComponent(`${this.name} (${outcome})`);
        return `https://image-charts.com/chart?chtt=${encodedCountry}&chbh=a&chd=a:${points.join()}&chl=${points.join("|")}&chxl=0:|${dates.join("|")}|&chxt=x&chs=999x250&cht=bvg`
    }
}

export default class Dataset {
    constructor() {
        this.countries = new Map();
    }

    country(name) {
        return this.countries.get(name.toLowerCase());
    }

    push(outcome, csv) {
        let country = new Country(csv);        
        let series = extractDataPoints(outcome, csv);
        this.addData(country, series)
    }

    addData(country, series) {
        let key = country.name.toLowerCase()
        if(this.countries.has(key)) {
            this.countries.get(key).add(series)
        }else{
            this.countries.set(key, country.add(series));
        }
    }

    merge(dataset) {
        dataset.countries.forEach(country => {
            this.addData(country, country.dataPoints);
        });
        return this;
    }
}