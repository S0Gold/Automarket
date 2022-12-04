import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserViewDto } from 'src/app/Dto/userView';
import { Announcement } from 'src/app/Model/announcement';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  numberText : string = "**********"
  userId! : number;
  user! : UserViewDto;
  announcements! : Array<Announcement>;
  constructor(
    private route : Router,
    private router : ActivatedRoute,
    private service : UserService,
    private serviceAnnouncement : AnnouncementService
    
  ) { }

  ngOnInit() {
    this.userId = Number(this.router.snapshot.params['id']);
    this.service.getUserById(this.userId).subscribe(
      (data: UserViewDto) =>{
        this.user = data;
        this.getAllAnnouncements(); 
      }, error => this.route.navigate(['/'])
    );
  }

  getAllAnnouncements(){
    this.serviceAnnouncement.GetAnnouncementsByUserId(this.userId).subscribe(
      (data: Array<Announcement>) =>{
        this.announcements = data;
      }, error => this.route.navigate(['/'])
    );
  }

  clickEvent(){
    if(localStorage.getItem("token")){
      this.numberText = this.user.phoneNumber.toString();
    }
  }

}
