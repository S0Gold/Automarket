import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AnnouncementAddDto } from '../Dto/announcementAddDto';
import { AnnouncementViewDto } from '../Dto/announcementViewDto';
import { CEVA } from '../Dto/CEVA';
import { SearchDto } from '../Dto/searchDto';
import { Announcement } from '../Model/announcement';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  baseUrl = 'https://localhost:7039/api/Announcements';

  constructor(private http : HttpClient) { }

  GetAllAnnouncements( ) : Observable<Array<Announcement>> {
    return this.http.get<Array<Announcement>>(this.baseUrl);
  }

  GetAllAnnouncementsByParams(param : SearchDto ) {
    return this.http.post<Array<Announcement>>(this.baseUrl+"/GetAnnouncementsByParams", param);
  }

  GetAnnouncementById( id : number) : Observable<Announcement> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", +id);
    return this.http.get<Announcement>(this.baseUrl+'/'+id);
  }

  GetAnnouncementsByUserId( id : number) {
    return this.http.get<Array<Announcement>>(this.baseUrl+'/GetByUserId/'+id);
  }

  AddAnnouncement(newAnnouncement : AnnouncementAddDto){
    //let queryParams = new HttpParams();
    // queryParams = queryParams.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
   // queryParams = queryParams.append("request", JSON.stringify(newAnnouncement));
   // queryParams = queryParams.append("files", JSON.stringify(newAnnouncement));
   return this.http.post<number>(this.baseUrl,
                         newAnnouncement,
                         { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}}
                       );
   }

  EditAnnouncement(newAnnouncement : AnnouncementAddDto, id : number){
    return this.http.put<number>(this.baseUrl +"/"+ id,
                                newAnnouncement,
                                { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}}
                       );
  }

  RemoveAnnouncement( id : number){
    return this.http.delete(this.baseUrl+"/"+id);
  }

  GetRecentAnnouncements() : Observable<Array<Announcement>> {
    return this.http.get<Array<Announcement>>(this.baseUrl+"/RecentAnnouncements");
  }

  GetMostViewedAnnouncements() : Observable<Array<Announcement>> {
    return this.http.get<Array<Announcement>>(this.baseUrl+"/MostViewedAnnouncements");
  }

  GetRecomandation(){
    return this.http.get<Array<Announcement>>(this.baseUrl+"/RecomandedAnnouncements",
    { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`}});
  }

   getOlx(i : number){
     return this.http.get("https://www.olx.ro/api/v1/offers/?offset="+i*50+
     "&limit=40"+
     "&category_id=189",
    // "&filter_enum_petrol%5B0%5D=diesel"+
    // "&filter_enum_car_body%5B0%5D=sedan"+
     //"&filter_float_year%3Afrom=2009"+
     //"&filter_float_year%3Ato=2009",
     { headers: {"Access-Control-Allow-Origin" : `true`}})
     
   }

   doSmt(){
    return this.http.get("https://localhost:7039/api/PriceEstimation")
   }
   

}
