import { Component, OnInit } from '@angular/core';
import { Announcement } from 'src/app/Model/announcement';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserAnnouncementService } from 'src/app/services/userAnnouncement.service';

@Component({
  selector: 'app-user-favorites',
  templateUrl: './user-favorites.component.html',
  styleUrls: ['./user-favorites.component.css']
})
export class UserFavoritesComponent implements OnInit {

  favorites: Array<Announcement> = [];

  constructor(private service : UserAnnouncementService,
              private alertify : AlertifyService) { }

  ngOnInit() {}

}
