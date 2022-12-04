import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserSearchDto } from 'src/app/Dto/userSearchView';
import { UserViewDto } from 'src/app/Dto/userView';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css'],
})
export class UserSearchComponent implements OnInit {
  @Output() change = new EventEmitter<Array<UserViewDto>>();

  dataModel: UserSearchDto = {
    FirstName: '',
    LastName: '',
    EmailAddress: '',
    PhoneNumber: ''
  };
  users!: Array<UserViewDto>;


  constructor(
    private userService: UserService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {

  }

  onSubmit() {
     this.userService
       .findUsers(this.dataModel)
       .subscribe(
        response => {
          this.change.emit(response);
          console.log(response);
          this.alertify.warning('Cautarea efectuata');
        },
        (error) => {
          console.log(error);
          this.alertify.error("Eroare la procesare");
        }
      );
  }

}
