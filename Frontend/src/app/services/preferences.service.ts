import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PreferencesDto } from '../Dto/preferencesDto';
import { PreferencesRequestDto } from '../Dto/preferencesRequestDto';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  baseUrl = 'https://localhost:7039/api/Preferences';

  constructor( private http : HttpClient) { }
  
  EditPreferences(request : PreferencesDto)  {
    return this.http.post<string>(this.baseUrl,request,{headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}});
  }
  
  GetPreferences(){
   return this.http.get<PreferencesRequestDto>(this.baseUrl, {headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}});
  }
  

}
