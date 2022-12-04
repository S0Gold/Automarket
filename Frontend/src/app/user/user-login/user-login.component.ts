import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginDto } from 'src/app/Dto/userLoginDto';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  loginForm!: FormGroup;
  submited! : boolean;
  user! : UserLoginDto;

  constructor(private userService : UserService,
              private alert : AlertifyService,
              private router : Router,
              private http : HttpClient,
              private fb : FormBuilder,
              ) { }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.fb.group( {
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(5)]],
      });
  }

  onLogin(){

    this.submited = true;

    if(this.loginForm.valid) {
     this.userService.userLogin(this.userLoginData()).subscribe(
      response => {
        this.submited = false;
        console.log(response);
        localStorage.setItem('token',response[0]);
        localStorage.setItem('user',response[1]);
        this.alert.success('Login successfully!');
        this.router.navigate(['/']);
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

  userLoginData() : UserLoginDto {
    return this.user = {
      password : this.password.value,
      emailAddress : this.emailAddress.value,
    };
  }


  get emailAddress() {
    return this.loginForm.get('email') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }

}
