import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getDayName'
})
export class GetDayNamePipe implements PipeTransform {

  daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  transform(value: any): string {
    return this.daysOfWeek[new Date(value).getDay()];
  }
  
}