var isDate = function(date) {
    return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}

class Country {
    constructor(json) {
        this.country = json['Country/Region'].toLowerCase();
        this.dates = this.extractDates(json);
    }
    extractDates(row) {
        return Object.keys(row).filter(key => {
            return isDate(key);
        }).map(key => { 
            return {"day":key, "count":parseInt(row[key])}; 
        });
    } 
    combine(country) {        
        country.dates.forEach(a => {
            let day = this.dates.find(b => a.day === b.day)
            day.count += parseInt(a.count);
        });
    }    
    chart() {
        let fortnight = this.dates.slice(this.dates.length - 14);
        let points = fortnight.map(d => d.count);
        let dates = fortnight.map(d => d.day.substr(0, d.day.lastIndexOf('/')));
        return `https://image-charts.com/chart?chtt=${this.country}&chbh=a&chd=a:${points.join()}&chl=${points.join("|")}&chxl=0:|${dates.join("|")}|&chxt=x&chs=999x250&cht=bvg`
    }
}

export default class Dataset {
    constructor() {
        this.countries = new Map();
    }

    country(country) {
        return this.countries.get(country.toLowerCase());
    }

    push(data) {
        let row = new Country(data);
        if(this.countries.has(row.country)) {
            this.countries.get(row.country).combine(row)
        }else{
            this.countries.set(row.country, row);
        }
    }
}