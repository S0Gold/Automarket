import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs'

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

constructor() { }

success(message : string){
  alertify.set('notifier','position','top-right');
  alertify.success(message,'top-right');
}

error(message : string){
  alertify.set('notifier','position','top-right');
  alertify.error(message);

}

warning(message : string){
  alertify.set('notifier','position','top-right');
  alertify.warning(message,'top-right');
}



}
