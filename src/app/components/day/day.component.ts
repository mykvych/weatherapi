import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss']
})
export class DayComponent implements OnInit {

  @Input() dayInfo: any[];
  showForecast: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  seeHourlyForecast(){
    this.showForecast = !this.showForecast;
  }

}
