import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'celsius'
})
export class CelsiusPipe implements PipeTransform {

  transform(value: any): string {
    return (Math.round((Number(value) - 273.15) * 10) / 10).toString();
  }
  
}