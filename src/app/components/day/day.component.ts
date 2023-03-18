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

  seeHourlyForecast(event: HTMLElement){
    if(event.tagName != 'DIV'){
      var parentEl = event.parentElement.parentElement;
      this.openHours(parentEl);
    }else
      this.openHours(event);

    this.showForecast = !this.showForecast;
  }

  openHours(el: HTMLElement){
    let element = el.getElementsByClassName('day-arrow')[0] as HTMLElement;
    if(element.style.transform == 'rotate(90deg)')
      element.style.transform = 'rotate(0deg)'
    else
      element.style.transform= 'rotate(90deg)';
  }

}
