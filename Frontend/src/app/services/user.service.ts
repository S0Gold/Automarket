import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ChangePasswordDto } from '../Dto/changePasswordDto';
import { UserLoginDto } from '../Dto/userLoginDto';
import { UserSearchDto } from '../Dto/userSearchView';
import { UserViewDto } from '../Dto/userView';
import { User } from '../Model/user';
import { UserLoginComponent } from '../user/user-login/user-login.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'https://localhost:7039/api/User/';

constructor( private http : HttpClient) { }

userLogin(user : UserLoginDto)  {
  return this.http.post<Array<string>>(this.baseUrl+"Login", user ,{responseType: 'json'});
}

userRegister(user : User){
 return this.http.post(this.baseUrl+"Register", user);
}

forgotPassword(response : ChangePasswordDto ){
  return this.http.post(this.baseUrl+"RecoverEmail", response);
}

changePassword(response : ChangePasswordDto){
  console.log(response);
  return this.http.post(this.baseUrl+"ChangePassword", 
                response, 
                {headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}});
              }

sendEmail(emailAddress : any){
  return this.http.get(this.baseUrl+"SendRecoverEmail?emailAddress="+emailAddress);
}

getUser(){
  return this.http.get<User>(
    this.baseUrl+"GetUser",
    {headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}}
  );
}

getUserById(id : number ){
  return this.http.get<UserViewDto>(
    this.baseUrl+"GetUserById/"+id,
    {headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}}
  );
}

userEdit(user : User){
  return this.http.put(
      this.baseUrl+"EditUser", 
      user,
      {headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}}
  );
}

userRemove( ){
  return this.http.delete(
      this.baseUrl+"RemoveUser", 
      {headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}}
  );
}

userRemoveByAdmin(id:number ){
  return this.http.delete(
      this.baseUrl+"RemoveUserByAdmin/"+id, 
      {headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}}
  );
}

getAllUsers(){
  return this.http.get<Array<UserViewDto>>(
    this.baseUrl+"GetUsers",
    {headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}}
  );
}

findUsers(input : UserSearchDto){
  return this.http.post<Array<UserViewDto>>(
    this.baseUrl+"SearchUsers",
    input,
    {headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}}
  );
}


}
