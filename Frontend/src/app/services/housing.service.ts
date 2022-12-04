import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Car } from '../Model/car';
import { Announcement } from '../Model/announcement';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  baseUrl = 'https://localhost:7039/api/';

constructor(private http:HttpClient) { }

getAnnouncement(id :number)  {
  return this.getAllAnnouncements().pipe(
    map(arr => {
      return arr.find(index => index.id === id);
    })
  );
}

getAllAnnouncements(): Observable<Announcement[]>{

  return this.http.get(
                        "https://localhost:7039/api/Announcements",
                        { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}}
                      ).pipe(
    map(data =>{
      const arrayAnn : Array<Announcement> = [];
      for(const id in data){
        if(data.hasOwnProperty(id)){
          console.log(data[id]);
          arrayAnn.push(data[id]);
        }
      }
      return arrayAnn;
    })
  );


  // return this.http.get('data/properties.json').pipe(
  //   map(data =>{
  //     const propertiesArray : Array<IAnnouncement> = [];
  //     for(const id in data){
  //       if(data.hasOwnProperty(id)){
  //         propertiesArray.push(data[id]);
  //       }
  //     }
  //     return propertiesArray;
  //   })
  // );
}

setAllCars( cars : Array<Car>) {
  return this.http.post("https://localhost:7039/api/Car/Get", cars);
}

 getAllCars() : Observable<Car[]> {

  return this.http.get<Car[]>("data/cass.json").pipe(
   map(data =>{
     const propertiesArray : Array<Car> = [];
     for(const id in data){
       if(data.hasOwnProperty(id)){
         propertiesArray.push(data[id]);
       }
     }
     return propertiesArray;
   })
 );
}


}
