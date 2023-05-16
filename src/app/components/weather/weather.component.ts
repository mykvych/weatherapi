import { Component, DoCheck, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { NotificationService } from '../../services/notification.service';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CityInfo } from 'src/app/models/cityInfo';
import { Coord } from 'src/app/models/coord';
import { Forecast } from 'src/app/models/forecast';
import { Forecast_List } from 'src/app/models/forecast_list';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, DoCheck{

  cityName: string = '';
  cityCoordinates: Coord = {
    lat: 0,
    lon: 0
  };
  countriesAndStates: CityInfo[] = [];
  weatherInfo: Forecast;
  countriesDropdown: Element;
  countriesInput: HTMLInputElement;
  countriesOptions: NodeListOf<Element>;

  @Output() coordinates = new EventEmitter<string>();
  @Output() days = new EventEmitter<Forecast_List[]>();

  constructor(@Inject(DOCUMENT) private document: Document,
    private httpService: HttpService, 
    private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.countriesDropdown = this.document.querySelector('.countries-states-dropdown');
    this.countriesInput = this.document.querySelector('.countries-input');
    this.countriesOptions = this.document.querySelectorAll('.option');
  }

  ngDoCheck(): void {
    if(this.cityName.length == 0){
      this.resetCoordinatesDropdown();
    }
  };

  toggleDropdown = () => {
    if(this.countriesAndStates.length > 1){
      this.countriesDropdown.classList.toggle('opened');
    }
  };

  selectOption = (event) => {
    this.countriesInput.value = event.currentTarget.textContent;
    let city = this.countriesAndStates.find(x => {
      if(x.state != undefined)
        return `${x.name}, ${x.state}, ${x.country}` == this.countriesInput.value.trim()
      else
        return `${x.name}, ${x.country}` == this.countriesInput.value.trim() 
    });
    [this.cityCoordinates.lat, this.cityCoordinates.lon] = [city.lat, city.lon];
  };

  getDaysInfo(cityCoordinates: Coord){
    this.httpService
      .getWeather(cityCoordinates)
      .subscribe({
        next: (response: Forecast) => {
          this.weatherInfo = response;
        },
        error: error => console.log(error),
        complete: () => {
          this.days.emit(this.weatherInfo.list)
        }
      });
  }

  getWeather(){
    this.getDaysInfo(this.cityCoordinates);
    this.coordinates.emit(`${this.cityCoordinates.lat}, ${this.cityCoordinates.lon}`);
    this.notificationService.showSuccess(`City ${this.cityName} is found`, 'Success');
  }

  getCountriesAndStates(){
    if(this.cityName.length == 0){
      this.countriesAndStates = [];
      this.resetCoordinatesDropdown();
    }else if(this.cityName.length >= 3){
      this.httpService
        .getCountriesAndStates(this.cityName.toUpperCase())
        .subscribe({
          next: (response: any) => {
            if(response.length == 0){
              this.notificationService.showError(`City ${this.cityName} does not exist`, 'Error');
              this.resetCoordinatesDropdown();
            }else{
              this.countriesAndStates = response;
            }
          }
        });
    }
  }

  resetCoordinatesDropdown(){
    this.countriesInput.value = '';
    this.cityCoordinates.lat = 0;
    this.cityCoordinates.lon = 0;
  }
}

