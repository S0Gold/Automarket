import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ChangePasswordDto } from 'src/app/Dto/changePasswordDto';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-changePassword',
  templateUrl: './user-changePassword.component.html',
  styleUrls: ['./user-changePassword.component.css']
})
export class UserChangePasswordComponent implements OnInit {

  @Input() header: Boolean = true;
  
  email! :string;
  form!: FormGroup;
  submited! : boolean;

  constructor(private route : ActivatedRoute,
              private router : Router,
              private fb : FormBuilder,
              private userService : UserService,
              private alert : AlertifyService
              ) { }

  ngOnInit() {
    this.submited = false;
    this.createForm();
  }

  onClick(){
    this.submited = true;
    if(this.form.valid) {
      this.userService.changePassword(this.formData()).subscribe(
       response => {
         this.submited = false;
         console.log(response);
         this.alert.success('Password changed successfully!');
         this.router.navigate(['/user/login']);
       }, error =>{
         console.log(error);
         this.alert.error(error.error);
       }
       );
    }
  }

  setClasses(){
    if(this.header){
      return "col-4 m-auto";
    }
    else{
      return "col-4";
    }
  }
  createForm() {
    this.form = this.fb.group( {
      oldPassword: [null, [Validators.required, Validators.minLength(5)]],
      password: [null, [Validators.required, Validators.minLength(5)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(5)]],
    }, {validators: this.passwordMatchingValidator});
  }

  passwordMatchingValidator(fc: AbstractControl): ValidationErrors | null {
    return fc.get('password')?.value === fc.get('confirmPassword')?.value ? null :
      { notmatched: true }
  };

  formData() : ChangePasswordDto {
    let data : ChangePasswordDto;
    return data = {    
      EmailAddress : "",
      Password : this.password.value,
      OldPassword : this.oldPassword.value,
    };
  }
  get password(){
    return this.form.get('password') as FormControl;
  }
  get confirmPassword(){
    return this.form.get('confirmPassword') as FormControl;
  }
  get oldPassword(){
    return this.form.get('oldPassword') as FormControl;
  }

}
