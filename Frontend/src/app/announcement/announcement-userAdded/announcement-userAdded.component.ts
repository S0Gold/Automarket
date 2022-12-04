import { Component, OnInit } from '@angular/core';
import { UserViewDto } from 'src/app/Dto/userView';
import { Announcement } from 'src/app/Model/announcement';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from 'src/app/services/user.service';
import { UserAnnouncementService } from 'src/app/services/userAnnouncement.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { AnnouncementService } from 'src/app/services/announcement.service';

@Component({
  selector: 'app-announcement-userAdded',
  templateUrl: './announcement-userAdded.component.html',
  styleUrls: ['./announcement-userAdded.component.css']
})
export class AnnouncementUserAddedComponent implements OnInit {

  announcements: Array<Announcement> = [];
  user! : UserViewDto;
  constructor(private service : UserService,
              private announcementService : AnnouncementService,
              private alertify : AlertifyService,
              private route: Router) { }

  ngOnInit() {
    this.announcementService.GetAnnouncementsByUserId(this.getDecodedAccessToken("User")).subscribe(
        (data) => this.announcements = data
      , (error) => this.route.navigate(['/'])
    );
    
  }

  getDecodedAccessToken(input: string) {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const elems: Object = jwt_decode(token);
        switch (input) {
          case 'User':
            return Object.values(elems)[0];
          case 'Email':
            return Object.values(elems)[1];
          case 'Role':
            return Object.values(elems)[2];
        }
      } catch (Error) {
        return null;
      }
    } else {
      return null;
    }
  }
}
