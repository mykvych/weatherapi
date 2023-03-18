import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseLocation'
})
export class ParseLocationPipe implements PipeTransform {

  transform(value: any): string {
    if(value.state == undefined)
      return `${value.name}, ${value.country}`;

    return `${value.name}, ${value.state}, ${value.country}`;
  }
}
