import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

 loggedinUser! :string;

  constructor(private alertify : AlertifyService,
              private route :Router) { }

  ngOnInit() {
  }

  loggedin(){
    this.loggedinUser = localStorage.getItem('user')!;
    return this.loggedinUser;
  }
  onLogout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.alertify.warning('Logout successfully!')
  }

  getDecodedAccessToken(input : string) {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const elems : Object = jwt_decode(token);
        switch(input){
          case "User" : return Object.values(elems)[0];
          case "Email" : return Object.values(elems)[1];
          case "Role" : return Object.values(elems)[2];
        }  
        
      } catch (Error) {
        return null;
      }
    } else {
      return null;
    }
  }

  goTo(id :number){
    this.route.navigate(['/user/profile/'+id]);
  }

}
