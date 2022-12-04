import { Component, OnInit } from '@angular/core';
import { Announcement } from 'src/app/Model/announcement';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserAnnouncementService } from 'src/app/services/userAnnouncement.service';

@Component({
  selector: 'app-announcement-favorites',
  templateUrl: './announcement-favorites.component.html',
  styleUrls: ['./announcement-favorites.component.css']
})
export class AnnouncementFavoritesComponent implements OnInit {

  favorites: Array<Announcement> = [];

  constructor(private service : UserAnnouncementService,
              private alertify : AlertifyService,
             ) { }

  ngOnInit() {
    this.service.getAnnouncements().subscribe(
      response =>{
        this.favorites = response;
      }
    )
    
  }

}
