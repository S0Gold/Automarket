import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { Subscription } from 'rxjs';
import { Announcement } from 'src/app/Model/announcement';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { CommonService } from 'src/app/services/commonService.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('formTabs') formTabs!: TabsetComponent;

  hidden : Boolean = true;
  
  searchedAnnouncements! : Array<Announcement>;
  tabSelected : number = 1
  constructor( private elem: ElementRef,
    private alert :AlertifyService,
    private service:AnnouncementService){}

  ngOnInit() {

    this.alert.success("Test");
    this.alert.warning("Test");
    this.alert.error("Test");

    if(localStorage.getItem('token') != null){
      let token :string = localStorage.getItem('token') || "";
      if (this.isTokenExpired(token)) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }

  }

  process(event : Array<Announcement>){
    console.log(event);
    this.hidden = false;
    this.searchedAnnouncements = event
    setTimeout(() => { this.formTabs.tabs[4].active = true;  }, 100)
  }

  changeTab( id : any ){
    this.tabSelected = id;
   }

   logged(){
      return localStorage.getItem('user') != null? true : false;
   }

  isTokenExpired(token : string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
  
  getOlx(){
    this.service.getOlx(10).subscribe(
      data => console.log(data)
    )
  }

}
