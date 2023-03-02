import { Component, OnInit } from '@angular/core';
      
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'] 
})
export class AppComponent implements OnInit {

    lat: string = '';
    lon: string = '';
    coordinates: string = '';
    daysList: any[];
    forecast = new Map();

    handleCoordinates(coordinates: any){

        this.coordinates = coordinates;

        if(this.coordinates === ''){
            [this.lat, this.lon] = '';
        }else {
            [this.lat, this.lon] = coordinates.split(',');
        }
    }

    getWeather(weatherList: any[]){

        let hours = weatherList.map(a => a.dt_txt.substring(0,10));
        let keys = [... new Set(hours)]

        keys.forEach(k => {
            hours = weatherList.filter(f => f.dt_txt.includes(k));
            this.forecast.set(k, hours);
            this.forecast = new Map([...this.forecast].sort());
        })

        console.log(this.forecast);
    }

    constructor() { }

    ngOnInit(): void {
    }
}
