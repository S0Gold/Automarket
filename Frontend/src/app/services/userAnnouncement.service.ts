import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnnouncementViewDto } from '../Dto/announcementViewDto';
import { Announcement } from '../Model/announcement';
import { RequestDto } from '../Dto/requestDto';
@Injectable({
  providedIn: 'root'
})
export class UserAnnouncementService {

  baseUrl = 'https://localhost:7039/api/UserAnnouncement/';

  constructor(private http : HttpClient) { }

  getAnnouncements() {
    return this.http.get<Array<Announcement>>(
        this.baseUrl+"GetFavoriteAnnouncements",
        { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}}
      );
  }
  getAnnouncementsId() {
    return this.http.get<Array<number>>(
        this.baseUrl+"GetFavoriteAnnouncementsId",
        { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}}
      );
  }

  addFavoriteAnnouncement(announcementId: number){

    const request : RequestDto ={
      announcementId: announcementId,
      userId: 0,
      message: ''
    };
    return this.http.post<string>(
      this.baseUrl+"AddFavorite",
      request,
      {headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}});
  }

  removeFavoriteAnnouncement(announcementId: number){

    const request : RequestDto ={
      announcementId: announcementId,
      userId: 0,
      message: ''
    };

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
      }),
      body: request
    };

    return this.http.delete<string>(this.baseUrl+"RemoveFavorite", options);
  }

  addSeenAnnouncement(announcementId: number){
    const request : RequestDto ={
      announcementId: announcementId,
      userId: 0,
      message: ''
    };

    return this.http.post<number>(
      this.baseUrl+"AddSeenAnnouncement",
      request,
      { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}}
    );
  }

  getViews(announcementId: number){
    const request : RequestDto ={
      announcementId: announcementId,
      userId: 0,
      message: ''
    };

    return this.http.post<number>(
      this.baseUrl+"GetViews", request);
  }

  getAnnouncementOwner(announcementId: number){
    return this.http.get<number>( this.baseUrl+"GetAnnouncementOwner?id="+announcementId);
  }
}
