import { Pipe, PipeTransform } from '@angular/core';
import { Announcement } from '../Model/announcement';

@Pipe({
  name: 'Filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterString : string, propName : string): any[] {
    const resultArray = [];
    if(value.length === 0 || filterString ==='' || propName === ''){
      return value;
    }
    console.log(propName);
    console.log(filterString);
    for(const item of value){
      if(item.car.brand.includes(filterString)){
        resultArray.push(item);
      }
    }
    return resultArray;

  }

}
