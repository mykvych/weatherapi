import { Component } from '@angular/core';
import { Forecast_List } from './models/forecast_list';
      
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'] 
})
export class AppComponent {

    hours: Forecast_List[] | string[];
    lat: string = '';
    lon: string = '';
    coordinates: string = '';
    forecast = new Map();

    constructor() { }

    handleCoordinates(coordinates: string){
        this.coordinates = coordinates;

        if(this.coordinates === ''){
            [this.lat, this.lon] = '';
        }else {
            [this.lat, this.lon] = coordinates.split(',');
        }
    }

    getWeather(weatherList: Forecast_List[]){
        this.hours = weatherList.map(a => a.dt_txt.substring(0,10));
        let keys = [... new Set(this.hours)]

        keys.forEach(k => {
            this.hours = weatherList.filter(f => f.dt_txt.includes(k));
            this.forecast.set(k, this.hours);
            this.forecast = new Map([...this.forecast].sort());
        })
    }
}
