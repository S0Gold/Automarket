import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { timeout } from 'rxjs';
import { AnnouncementViewDto } from 'src/app/Dto/announcementViewDto';
import { UserViewDto } from 'src/app/Dto/userView';
import { Announcement } from 'src/app/Model/announcement';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { UserService } from 'src/app/services/user.service';
import { UserAnnouncementService } from 'src/app/services/userAnnouncement.service';


@Component({
  selector: 'app-announcement-detail',
  templateUrl: './announcement-detail.component.html',
  styleUrls: ['./announcement-detail.component.css']
})
export class AnnouncementDetailComponent implements OnInit {

  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[] ;

  announcementId! : number;
  announcement! : Announcement;
  userId! : number;
  user!: UserViewDto
  primaryPhoto!: string;
 

  numberOfViews : number = 0;
  show : Boolean = false;
  @ViewChild('formTabs') formTabs!: TabsetComponent;
  
  constructor(private route : ActivatedRoute,
              private router : Router,
              private service : UserService,
              private announce : AnnouncementService,
              private linkService : UserAnnouncementService) { }

   ngOnInit() {
    this.announcementId = Number(this.route.snapshot.params['id']);
    this.announce.GetAnnouncementById(this.announcementId).subscribe(
      (data: Announcement) =>{
        this.announcement = data;
        this.initData();
        console.log(this.announcement);
       
      }, error => this.router.navigate(['/'])
    );

    
  }

  getAnnouncementPhoto() : NgxGalleryImage[]{
    const photoUrls : NgxGalleryImage[] = [];

    console.log(this.announcement);

    for(let photo of this.announcement.photos){
      console.log(photo);
      photoUrls.push(
        {
          small:photo.imageUrl,
          medium:photo.imageUrl,
          big:photo.imageUrl
        }
      );
    }
    console.log(photoUrls);
    return photoUrls;
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

  initData(){

    if(localStorage.getItem("token")){
      this.linkService.addSeenAnnouncement(this.announcementId).subscribe(
        data => this.numberOfViews = data
      );  
    }
    else{
      this.linkService.getViews(this.announcementId).subscribe(
        data => this.numberOfViews = data
      );  
    }

    this.galleryOptions = [
      {
        width: '100%',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryImages = this.getAnnouncementPhoto();
    this.getPrimaryPhoto();
  }

  contact(){
    if(localStorage.getItem("token")){
      this.show = true;
      this.linkService.getAnnouncementOwner(this.announcementId).subscribe(
        (data) =>{
          this.userId = data;
          this.service.getUserById(data).subscribe(
            (response) => this.user = response ,
            (error) => this.router.navigate(['/'])
          )}
        , (error) => this.router.navigate(['/'])
      );
      setTimeout( () =>  this.formTabs.tabs[3].active = true, 100);   
    }
    else{
      this.router.navigate(["/user/login"]);
    }
  }
}

