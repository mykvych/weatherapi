import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CityInfo } from '../models/cityInfo';
import { Coord } from '../models/coord';
import { Forecast } from '../models/forecast';
  
@Injectable()
export class HttpService{
  url: string;

  constructor(private http: HttpClient){ }
    
  getWeather(coordinates: Coord): Observable<Forecast>{

    this.url = `http://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=c9dd7eeb1316e4aaa7af48ab20b74d22`;

    return this.http.get<Forecast>(this.url);
  }

  getCountriesAndStates(city: string): Observable<CityInfo[]>{
    this.url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=10&appid=c9dd7eeb1316e4aaa7af48ab20b74d22`;

    return this.http.get<CityInfo[]>(this.url);
  }
}