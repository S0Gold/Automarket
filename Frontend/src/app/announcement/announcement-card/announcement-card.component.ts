import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Announcement } from 'src/app/Model/announcement';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { FileUploadService } from 'src/app/services/fileUploadService.service';
import * as alertify from 'alertifyjs';
import { UserAnnouncementService } from 'src/app/services/userAnnouncement.service';
import { CommonService } from 'src/app/services/commonService.service';
import jwt_decode from 'jwt-decode';
import { getLocaleDateFormat } from '@angular/common';
import { PriceEstimationService } from 'src/app/services/priceEstimation.service';
import { PriceEstimatioResponseDto } from 'src/app/Dto/priceEstimatioResponseDto';

@Component({
  selector: 'app-announcement-card',
  templateUrl: './announcement-card.component.html',
  styleUrls: ['./announcement-card.component.css'],
})
export class AnnouncementCardComponent implements OnInit {
  @Input() announcement!: Announcement;
  @Input() favorite!: boolean;
  @Input() preview!: boolean;
  primaryPhoto!: string;
  userId!: number;
  priceEstimation? : PriceEstimatioResponseDto;
  constructor(
    private announcementService: AnnouncementService,
    private fileService: FileUploadService,
    private router: Router,
    private alertify: AlertifyService,
    private favoriteService: UserAnnouncementService,
    private Service: CommonService,
    private priceService : PriceEstimationService
  ) {
    // subscribe to sender component messages
    this.Service.getUpdate().subscribe((message) => {
      const image: any = localStorage.getItem('photo');
      this.primaryPhoto = image;
    });
  }

  ngOnInit() {
    this.getDataFromDb();
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

  getPrimaryPhoto() {
    let primary: string = '';

    if (this.announcement.photos) {
      this.announcement.photos.forEach((element) => {
        if (element.isPrimary) {
          this.primaryPhoto = element.imageUrl;
        }
      });
    }
  }

  removeAnnouncement(id: number) {
    this.fileService.removeAnnouncementPhotos(id).subscribe(
      (response) => {
        this.announcementService.RemoveAnnouncement(id).subscribe(
          (response) => {
            this.alertify.warning('Announcement removed succesfully');
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          },
          (error) => {
            console.log(error);
            this.alertify.error(error.errors);
          }
        );
      },
      (error) => {
        console.log(error);
        this.alertify.error(error.errors);
      }
    );
  }

  addFavorite(id: number) {
    this.favoriteService.addFavoriteAnnouncement(id).subscribe((response) => {
      this.favorite = true;
      this.alertify.success('Announcement added to favorites!');
    });
  }

  removeFavorite(id: number) {
    this.favoriteService
      .removeFavoriteAnnouncement(id)
      .subscribe((response) => {
        this.favorite = false;
        this.alertify.warning('Announcement removed from favorites!');
      });
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

  getDataFromDb(){

    this.priceService.getPriceEstimation(this.announcement).subscribe(
      (data) => {
        this.priceEstimation = data;
      }
    );

    this.getPrimaryPhoto();

    this.favoriteService
      .getAnnouncementOwner(this.announcement.id)
      .subscribe((response) => {
        this.userId = response;
      });

    
  }
}
