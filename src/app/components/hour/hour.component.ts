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

  showForecast(event: HTMLElement){
    if(event.tagName != 'DIV'){
      var parentEl = event.parentElement.parentElement;
      this.openHoursInfo(parentEl);
    }else
      this.openHoursInfo(event);

    this.showHourForecast = !this.showHourForecast;
  }

  openHoursInfo(el: HTMLElement){
    let element = el.getElementsByClassName('hour-arrow')[0] as HTMLElement;
    if(element.style.transform == 'rotate(90deg)')
      element.style.transform = 'rotate(0deg)'
    else
      element.style.transform= 'rotate(90deg)';
  }

}
