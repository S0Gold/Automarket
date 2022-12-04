import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Model/user';
import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';
import { UserViewDto } from 'src/app/Dto/userView';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users!: Array<UserViewDto>;
  constructor(
    private service: UserService,
    private route: Router,
    private alert: AlertifyService
  ) {}

  ngOnInit() {
    if (this.getDecodedAccessToken('Role') != 'Admin')
      this.route.navigate(['/']);

    this.service.getAllUsers().subscribe((response) => {
      this.users = response;
      console.log(response);
    });
  }

  process(response : Array<UserViewDto>){
    this.users = response;
  }
  popup(id: number) {
    alertify.confirm(
      'Sunteti sigur ca doriti sa stergeti utilizatorul cu emailul: ' +
        this.users.find((x) => x.id == id)?.emailAddress +
        '?',
      () => {
        this.remove(id);
      },
      function () {
        alertify.error('Cancel');
      }
    );
  }
  
  remove(id: number) {
    this.service.userRemoveByAdmin(id).subscribe(
      (response) => {
        this.alert.success('Utilizator indepartat.');
      },
      (error) => this.alert.warning('Eroare intampinata la proces.')
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
