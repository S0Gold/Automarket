import { Component, OnInit } from '@angular/core';
import { Announcement } from 'src/app/Model/announcement';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { UserAnnouncementService } from 'src/app/services/userAnnouncement.service';

@Component({
  selector: 'app-announcement-newest',
  templateUrl: './announcement-newest.component.html',
  styleUrls: ['./announcement-newest.component.css']
})
export class AnnouncementNewestComponent implements OnInit {

  properties: Array<Announcement> = [];
  favorites: Array<number> =[]

  constructor(private announcementService : AnnouncementService,
              private favoriteService : UserAnnouncementService,
             ) { }

  ngOnInit() {

    this.announcementService.GetRecentAnnouncements().subscribe(
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
