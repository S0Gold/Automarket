import { Pipe, PipeTransform } from '@angular/core';
import { Announcement } from '../Model/announcement';

@Pipe({
  name: 'Sort'
})
export class SortPipe implements PipeTransform {

  transform(value: Array<Announcement>, args : any) : any{
    let sortField = args[0];
    let sortDirection = args[1];

    if(sortField == "Descprice"){
      sortField = "price";
      sortDirection = "Desc"
    }

    let mutiplier = 1;
    if(sortDirection==='Desc'){
      mutiplier = -1;
    }

    value.sort( 
      (a : any, b : any) => {
        if(a[sortField] < b[sortField]){
          return -1 * mutiplier;
        } else if(a[sortField] > b[sortField]){
          return 1 * mutiplier;
        }else{
          return 0;
        }
    });

    return value;
  }

}
