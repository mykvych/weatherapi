import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { NotificationService } from '../../services/notification.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  cityName: string = '';
  cityClarification: string;
  countriesAndStates: any = [];
  weatherInfo: any = {};

  @Output() coordinates = new EventEmitter<string>();
  @Output() days = new EventEmitter<any[]>();

  constructor(private httpService: HttpService, 
    private notificationService: NotificationService,
    private utilService: UtilService) {
  }

  ngOnInit(): void {
  }

  getDaysInfo(weatherForm: any){
    this.httpService
      .getWeather(weatherForm.value.countries)
      .subscribe({
        next: (response: any) => {
          this.weatherInfo.weatherList = response.list;
          console.log(this.weatherInfo);
        },
        error: error => console.log(error),
        complete: () => this.days.emit(this.weatherInfo.weatherList)
      });
  }

  getWeather(weatherForm: any){

    if(this.utilService.isNullOrUnderfinedOrEmpty(weatherForm.value.city)){
      this.notificationService.showError('Please enter the city', 'Error');
    }else if(!this.utilService.isCityFormatCorrect(weatherForm.value.city)){
      this.notificationService.showWarning('Length of city should be between 2 and 15', 'Warning');
    }
    else{
      this.getDaysInfo(weatherForm);
      this.coordinates.emit(weatherForm.value.countries);
      this.notificationService.showSuccess(`City ${weatherForm.value.city} is found`, 'Success');
    }
  }

  getCountriesAndStates(){
    
    if(this.cityName.length == 0){
      this.countriesAndStates = [];
      this.cityClarification = '';
    }else if(this.cityName.length >= 3){
      this.httpService.getCountriesAndStates(this.cityName.toUpperCase())
        .subscribe({
          next: (response: Geolocation[]) => {
            if(response.length == 0){
              this.notificationService.showError(`City ${this.cityName} does not exist`, 'Error');
              this.cityClarification = '';
            }else{
              this.countriesAndStates = response;
              this.cityClarification = `${this.countriesAndStates[0].lat},${this.countriesAndStates[0].lon}`;
            }
          }
        });
    }
  }
}
