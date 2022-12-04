import { compileNgModuleDeclarationExpression } from '@angular/compiler/src/render3/r3_module_compiler';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ChangePasswordDto } from 'src/app/Dto/changePasswordDto';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-resetPassword',
  templateUrl: './user-resetPassword.component.html',
  styleUrls: ['./user-resetPassword.component.css']
})
export class UserResetPasswordComponent implements OnInit {

  email! :string;
  code! :string;
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
    this.email = this.route.snapshot.params['email'];
    this.code = this.route.snapshot.params['code'];
    this.createForm();
  }

  onClick(){
    this.submited = true;
    if(this.form.valid) {
      this.userService.forgotPassword(this.formData()).subscribe(
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

  createForm() {
    this.form = this.fb.group( {
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
      EmailAddress : this.email,
      Password : this.password.value,
      OldPassword : this.code
    };
  }

  get password(){
    return this.form.get('password') as FormControl;
  }
  get confirmPassword(){
    return this.form.get('confirmPassword') as FormControl;
  }

}
