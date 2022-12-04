import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Announcement } from 'src/app/Model/announcement';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { FileUploadService } from 'src/app/services/fileUploadService.service';
import { UserAnnouncementService } from 'src/app/services/userAnnouncement.service';
import * as alertify from 'alertifyjs';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-announcement-line-card',
  templateUrl: './announcement-line-card.component.html',
  styleUrls: ['./announcement-line-card.component.css']
})
export class AnnouncementLineCardComponent implements OnInit {

  @Input() announcement!: Announcement
  @Input() favorite! : boolean;
  primaryPhoto! : string;
  userId!: number;

  constructor(  private announcementService : AnnouncementService,
                private fileService : FileUploadService,
                private router : Router,
                private alertify : AlertifyService,
                private favoriteService: UserAnnouncementService){ }

  ngOnInit() {
    console.log(this.announcement);
    console.log(this.favorite);
    this.favoriteService
      .getAnnouncementOwner(this.announcement.id)
      .subscribe((response) => {
        this.userId = response;
      });
    this.getPrimaryPhoto();
  }

  popup(id: number) {
    let option: boolean;
    alertify.confirm(
      'You want to delete the announcement with id = ' + id,
      () => {
        alertify.success('Ok');
        this.removeAnnouncement(id);
      },
      function () {
        alertify.error('Cancel');
        option = false;
      }
    );
  }

 

  getPrimaryPhoto(){
    let primary : string ='';

    if(this.announcement.photos){
      this.announcement.photos.forEach(element => {
        if(element.isPrimary){
          this.primaryPhoto = element.imageUrl;
        }
      });
    }
  }

  removeAnnouncement(id : number){
    this.fileService.removeAnnouncementPhotos(id).subscribe(
      response => {
        this.announcementService.RemoveAnnouncement(id).subscribe(
          response =>{
            this.alertify.warning("Announcement removed succesfully");
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }, error =>{
            console.log(error);
            this.alertify.error(error.errors);
          });
      }, error =>{
        console.log(error);
        this.alertify.error(error.errors);
      });
  }

  removeFavorite(id : number){
    this.favoriteService.removeFavoriteAnnouncement(id).subscribe(
      response => {
        this.favorite = false;
        this.alertify.warning("Announcement removed from favorites!")
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
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
