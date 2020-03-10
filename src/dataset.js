class Country {
    constructor(json) {
        this.country = json['Country/Region'];
        this.state = json['Province/State']
        this.raw = [json];
    }
    combine(json) {
        console.log('combine')
        this.raw.push(json);
    }
}

export default class Dataset {
    constructor() {
        this.countries = new Map();
    }

    country(country) {
        return this.countries.get(country);
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