import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hour',
  templateUrl: './hour.component.html',
  styleUrls: ['./hour.component.scss']
})
export class HourComponent implements OnInit {

  @Input() hourInfo: any;
  showHourForecast: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  showForecast(){
    this.showHourForecast = !this.showHourForecast;
  }

}
