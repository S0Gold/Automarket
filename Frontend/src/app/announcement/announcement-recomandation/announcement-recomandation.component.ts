import { Component, OnInit } from '@angular/core';
import { Announcement } from 'src/app/Model/announcement';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { UserAnnouncementService } from 'src/app/services/userAnnouncement.service';

@Component({
  selector: 'app-announcement-recomandation',
  templateUrl: './announcement-recomandation.component.html',
  styleUrls: ['./announcement-recomandation.component.css']
})
export class AnnouncementRecomandationComponent implements OnInit {

  properties: Array<Announcement> = [];
  favorites: Array<number> =[]

  constructor(private announcementService : AnnouncementService,
              private favoriteService : UserAnnouncementService,
             ) { }

  ngOnInit() {

    this.announcementService.GetRecomandation().subscribe(
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
