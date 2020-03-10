class Country {
    constructor(json) {
        this.country = json['Country/Region'];
        this.state = json['Province/State']
        this.raw = [json];
    }
    combine(json) {
        this.raw.push(json);
    }
}

export default class Dataset {
    constructor() {
        this.countries = new Map();
    }
    push(data) {
        let row = new Country(data);
        console.log(row.country);
        if(this.countries.has(row.country)) {
            this.countries[row.country].combine(row)
        }else{
            this.countries[row.country] = row
        }
    }
}