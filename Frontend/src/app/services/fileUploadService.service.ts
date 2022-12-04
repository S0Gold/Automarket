
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Photo } from '../Model/photo';
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  // API url
  baseApiUrl = "https://localhost:7039/api/Photo/"

  constructor(private http:HttpClient) { }

  // Returns an observable
  upload(files : File[], id : number, primaryPhotoIndex : number):Observable<any> {
      // Create form data
      const formData = new FormData();
      Array.from(files).forEach(file => formData.append('files', file))
      return this.http.post(this.baseApiUrl+'UploadPhoto/'+ id + "/" + primaryPhotoIndex, 
      formData,
      { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}}
      )
  }
  update(files : File[], id : number, primaryPhotoIndex : number):Observable<any> {
    // Create form data
    console.log(files);
    const formData = new FormData();
    Array.from(files).forEach(file => formData.append('files', file))
    return this.http.post(this.baseApiUrl+'UpdatePhoto/'+ id + "/" + primaryPhotoIndex, 
    formData,
    { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}}
    )
}
  removeAnnouncementPhotos(announcementId : number){
    return this.http.delete(this.baseApiUrl+"RemovePhotos/" + announcementId,
    { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}});
  }
}
