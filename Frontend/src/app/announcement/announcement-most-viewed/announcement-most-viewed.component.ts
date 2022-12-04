import { Component, OnInit } from '@angular/core';
import { Announcement } from 'src/app/Model/announcement';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { UserAnnouncementService } from 'src/app/services/userAnnouncement.service';

@Component({
  selector: 'app-announcement-most-viewed',
  templateUrl: './announcement-most-viewed.component.html',
  styleUrls: ['./announcement-most-viewed.component.css']
})
export class AnnouncementMostViewedComponent implements OnInit {

  properties: Array<Announcement> = [];
  favorites: Array<number> =[]

  constructor(private announcementService : AnnouncementService,
              private favoriteService : UserAnnouncementService,
             ) { }

  ngOnInit() {

    this.announcementService.GetMostViewedAnnouncements().subscribe(
      data => {
        this.properties = data;
      });

    if(localStorage.getItem("token")){
      this.favoriteService.getAnnouncementsId().subscribe(
        data => {
          this.favorites = data;
        });}  
  }

  isFavorite(id : number){
   return (this.favorites.lastIndexOf(id) != -1) ? true : false;
  }
}
