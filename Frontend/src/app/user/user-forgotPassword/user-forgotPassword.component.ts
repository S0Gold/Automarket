import { compileNgModuleDeclarationExpression } from '@angular/compiler/src/render3/r3_module_compiler';
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ChangePasswordDto } from 'src/app/Dto/changePasswordDto';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-forgotPassword',
  templateUrl: './user-forgotPassword.component.html',
  styleUrls: ['./user-forgotPassword.component.css']
})
export class UserForgotPasswordComponent implements OnInit {

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
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group( {
      emailAddress: [null, [Validators.required, Validators.minLength(5)]],
    });
  }

  onClick(){
    if(this.emailAddress.value != null){
      this.userService.sendEmail(this.emailAddress.value).subscribe(
        response =>{
          this.alert.success('A link to reccover your password has been sent on your email!');
        }, error =>{
          console.log(error);
          this.alert.error(error.error);
        }
      );
    }
    else{
      this.alert.error('Kindly, provide the email adress');
    }
  }

  get emailAddress() {
    return this.form.get('emailAddress') as FormControl;
  }


}
