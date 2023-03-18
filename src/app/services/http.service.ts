import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
  
@Injectable()
export class HttpService{
  url: any;

  constructor(private http: HttpClient){ }
    
  getWeather(coordinates: any){

    this.url = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=c9dd7eeb1316e4aaa7af48ab20b74d22`;

    return this.http.get(this.url);
  }

  getCountriesAndStates(city: string): Observable<Geolocation[]>{
    this.url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=10&appid=c9dd7eeb1316e4aaa7af48ab20b74d22`;
    console.log(this.url);

    return this.http.get<Geolocation[]>(this.url);
  }
}