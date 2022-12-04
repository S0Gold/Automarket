import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from 'src/app/Model/user';
import * as alertify from 'alertifyjs';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from 'src/app/services/user.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  registrationForm!: FormGroup;
  user! : User;
  userSubmited! : boolean;

  constructor(private fb: FormBuilder,
              private servie : UserService,
              private route : Router,
              private alert : AlertifyService) { }

  ngOnInit() {
    this.createRegistraisonForm();
  }

  onSubmit(){
    this.userSubmited = true;

    if(this.registrationForm.valid){
      this.servie.userRegister(this.userData()).subscribe(
        response =>{
          this.registrationForm.reset();
          this.userSubmited = false;
          this.alert.success('Congrats, you are successfully registered');
          setTimeout(() => {
            this.route.navigate(["/user/login"]);
          }, 500);

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
      password : this.password.value,
      emailAddress : this.email.value,
      phoneNumber : this.mobile.value,
    };
  }
  passwordMatchingValidator(fc: AbstractControl): ValidationErrors | null {
    return fc.get('password')?.value === fc.get('confirmPassword')?.value ? null :
      { notmatched: true }
  };

  createRegistraisonForm(){
    this.registrationForm = this.fb.group( {
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(5)]],
      confirmPassword: [null, [Validators.required]],
      mobile:[null, [Validators.required, Validators.minLength(5)]]
      }, {validators: this.passwordMatchingValidator});
  }
  get firstName(){
    return this.registrationForm.get('firstName') as FormControl;
  }
  get lastName(){
    return this.registrationForm.get('lastName') as FormControl;
  }
  get email(){
    return this.registrationForm.get('email') as FormControl;
  }
  get password(){
    return this.registrationForm.get('password') as FormControl;
  }
  get confirmPassword(){
    return this.registrationForm.get('confirmPassword') as FormControl;
  }
  get mobile(){
    return this.registrationForm.get('mobile') as FormControl;
  }


}
