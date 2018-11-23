import {Pipe, PipeTransform} from '@angular/core';
import {del} from 'selenium-webdriver/http';

@Pipe({name: 'duration'})
export class DurationPipe implements PipeTransform {
  transform(value: string): string {
    let arr: any = '';
    if (value) {
      arr = value.split(':');
      if (arr[0] && (arr[0] == '0' || arr[0] == '00')) {
        arr.splice(0, 1);
      }
      if (arr[arr.length - 1]) {
        arr[arr.length - 1] = arr[arr.length - 1].split('.')[0];
      }
      arr = arr.toString().replace(new RegExp(',', 'g'), ':');
    }
    return arr;
  }
}
