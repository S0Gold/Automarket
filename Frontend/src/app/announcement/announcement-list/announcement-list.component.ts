
import { HttpParams } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { trimTrailingNulls } from '@angular/compiler/src/render3/view/util';
import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { CEVA } from 'src/app/Dto/CEVA';
import { Announcement } from 'src/app/Model/announcement';
import { Car } from 'src/app/Model/car';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { CarService } from 'src/app/services/car.service';
import { HousingService } from 'src/app/services/housing.service';
import { UserAnnouncementService } from 'src/app/services/userAnnouncement.service';

declare function httpGet(): any;

@Component({
  selector: 'announcement-property-list',
  templateUrl: './announcement-list.component.html',
  styleUrls: ['./announcement-list.component.css']
})
export class AnnouncementListComponent implements OnInit{

 

  properties: Array<Announcement> = [];
  favorites: Array<number> =[]
  cars: Array<Car> = [];
  model ='';
  searchModel ='';
  sortByParam ='';
  sortDirection = 'Asc';

  REQUEST : Array<CEVA> = []

  constructor(private announcementService : AnnouncementService,
              private favoriteService : UserAnnouncementService,
              private elementRef: ElementRef) { }

  ngOnInit() {

    this.announcementService.GetAllAnnouncements().subscribe(
      data => {
        this.properties = data;
      }
    );

    if(localStorage.getItem("token")){
      this.favoriteService.getAnnouncementsId().subscribe(
        data => {
          console.log(data);
          this.favorites = data;
        }
      );
    }
    
   
  }

  
  onSearch(){
    this.searchModel = this.model;
  }
  
  onSearchClear(){
    this.searchModel = '';
    this.model = '';
  }

  onSortDirection() {
    if(this.sortDirection === 'Asc')
      this.sortDirection = 'Desc';
    else
      this.sortDirection = 'Asc';
  }

  isFavorite(id : number){
    if(this.favorites.lastIndexOf(id) != -1){
      return true;
    }
    else{
      return false;
    }
  }

  process(event : any){
    this.properties = event;
  }

  getOlxAnnouncements(input : number){
    let i:number = 0
    while(i < input){
      this.announcementService.getOlx(i++).subscribe(
        (data: Object) => {
        this.REQUEST.push(...(data["data"]));
      });
    }

    setTimeout(() => {
      console.log(this.REQUEST)
      console.log("start")
      this.REQUEST.forEach(element => {
        let output : string = "";
        element.params.forEach( ceva =>{
          switch(ceva.key){
            case "price": output += "," + ceva.value.value; break;
            case "model": output += "," + ceva.value.label; break;
            case "car_body": output += "," + ceva.value.key; break;
            case "year": output += "," + ceva.value.key; break;
            case "petrol": output += "," + ceva.value.label; break;
            case "rulaj_pana": output += "," + ceva.value.key; break;
          }
        })
        console.log(output);

      });
      console.log("stop")
    }, 1000);
  }

}
