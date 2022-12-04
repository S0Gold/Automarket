import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserViewDto } from 'src/app/Dto/userView';
import { User } from 'src/app/Model/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit-information',
  templateUrl: './user-edit-information.component.html',
  styleUrls: ['./user-edit-information.component.css']
})
export class UserEditInformationComponent implements OnInit {

  editForm!: FormGroup;
  user! : User;
  userSubmited! : boolean;
  
  constructor(private fb: FormBuilder,
    private service : UserService,
    private route : Router,
    private alert : AlertifyService) { }

ngOnInit() {
  
  this.service.getUser().subscribe(
    (data: User) =>{        
      this.user = data;  
      this.createEditForm();  
    }, error => this.route.navigate(['/'])
    );
}

onSubmit(){
  if(this.editForm.valid){
    this.service.userEdit(this.userData()).subscribe(
      response =>{
        this.alert.success('Congrats, you are successfully registered');
        setTimeout(()=>{
          window.location.reload();
        }, 1000);
      }, error =>{
        console.log(error);
        this.alert.error(error.error);
      }
    );

  }
  else{
    this.alert.error('Kindly, provide the requierd fields');
  }

}

userData() : User{
  return this.user = {
    firstName : this.firstName.value,
    lastName : this.lastName.value,
    password : "null",
    emailAddress : this.email.value,
    phoneNumber : this.mobile.value,
  };
}


createEditForm(){
  this.editForm = this.fb.group( {
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    mobile:[null, [Validators.required, Validators.minLength(9), Validators.maxLength(10)]]
    });
}
get firstName(){
  return this.editForm.get('firstName') as FormControl;
}
get lastName(){
  return this.editForm.get('lastName') as FormControl;
}
get email(){
  return this.editForm.get('email') as FormControl;
}
get mobile(){
  return this.editForm.get('mobile') as FormControl;
}

}
