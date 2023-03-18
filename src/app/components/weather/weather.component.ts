import { Component, DoCheck, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { NotificationService } from '../../services/notification.service';
import { UtilService } from '../../services/util.service';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, DoCheck{

  cityName: string = '';
  cityCoordinates = {
    lat: '',
    lon: ''   
  };
  countriesAndStates: any = [];
  weatherInfo: any = {};
  countriesDropdown: Element;
  countriesInput: HTMLInputElement;
  countriesOptions: NodeListOf<Element>;

  @Output() coordinates = new EventEmitter<string>();
  @Output() days = new EventEmitter<any[]>();

  constructor(@Inject(DOCUMENT) private document: Document,
    private httpService: HttpService, 
    private notificationService: NotificationService,
    private utilService: UtilService) {
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

  getDaysInfo(cityCoordinates: object){
    this.httpService
      .getWeather(cityCoordinates)
      .subscribe({
        next: (response: any) => {
          this.weatherInfo.weatherList = response.list;
        },
        error: error => console.log(error),
        complete: () => this.days.emit(this.weatherInfo.weatherList)
      });
  }

  getWeather(){
    if(this.utilService.isNullOrUnderfinedOrEmpty(this.cityName)){
      this.notificationService.showError('Please enter the city', 'Error');
    }else if(!this.utilService.isCityFormatCorrect(this.cityName)){
      this.notificationService.showWarning('Length of city should be between 2 and 15', 'Warning');
    }
    else{
      this.getDaysInfo(this.cityCoordinates);
      this.coordinates.emit(`${this.cityCoordinates.lat}, ${this.cityCoordinates.lon}`);
      this.notificationService.showSuccess(`City ${this.cityName} is found`, 'Success');
    }
  }

  getCountriesAndStates(){
    if(this.cityName.length == 0){
      this.countriesAndStates = [];
      this.resetCoordinatesDropdown();
    }else if(this.cityName.length >= 3){
      this.httpService
        .getCountriesAndStates(this.cityName.toUpperCase())
        .subscribe({
          next: (response: Geolocation[]) => {
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
    this.cityCoordinates.lat = '';
    this.cityCoordinates.lon = '';
  }
}

