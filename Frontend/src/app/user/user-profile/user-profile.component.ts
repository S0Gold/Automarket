import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from 'src/app/Model/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import * as alertify from 'alertifyjs'
import {Location} from '@angular/common';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @ViewChild('formTabs') formTabs!: TabsetComponent;
  //@Input() tabSelected : number = 1;
  tabSelected : number = 1
  constructor(private router: ActivatedRoute,
              private service : UserService,
              private route : Router,
              private alert : AlertifyService,
              private location: Location) { }

  ngOnInit() {

    if(!localStorage.getItem("token")){
      this.route.navigate(['/']);
    }

    this.tabSelected = this.router.snapshot.params['id'];
    if(this.tabSelected){
      setTimeout(() => {
        this.formTabs.tabs[this.tabSelected-1].active = true;
      }, 100);
    }
    else{
      this.tabSelected=1;
    }
    
  }

  changeTab( id : any ){
   this.tabSelected = id;
   this.location.go("/user/profile/"+id);
  }

  popup(){
    alertify.confirm("Esti sigur ca vrei sa stergi contul?",
    () =>{  
      this.deleteUser();
      alertify.success('Ok');
    },
    function(){
      alertify.error('Cancel');
    });
  }

  deleteUser(){
    this.service.userRemove().subscribe(
      response => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      this.alert.warning("Cont sters cu succes");
      setTimeout(() => {
        this.route.navigate(["/"]);
      }, 3000);
      }, error =>{
        console.log(error);
        this.alert.error(error.errors);
      });
  }


}
