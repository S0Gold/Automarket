import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  baseUrl = 'https://localhost:7039/api/Car/';

  constructor(private http : HttpClient) { }

  GetModels( model : string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("brand", model);
    return this.http.get<Array<string>>(this.baseUrl + "GetModels", {params: queryParams});
  }
  GetBrands() {
    return this.http.get<Array<string>>(this.baseUrl + "GetMakes");
  }
  GetCategories(brand : string, model : string) : Observable<Array<string>>{

    let queryParams = new HttpParams();
    queryParams = queryParams.append("brand", brand);
    queryParams = queryParams.append("model", model);

    return this.http.get<Array<string>>(this.baseUrl + "GetCategory", {params: queryParams});

  }
  GetYear(brand : string, model : string, body: string) : Observable<Array<string>>{

    let queryParams = new HttpParams();
    queryParams = queryParams.append("brand", brand);
    queryParams = queryParams.append("model", model);
    queryParams = queryParams.append("body", body);

    return this.http.get<Array<string>>(this.baseUrl + "GetYear", {params: queryParams})

  }
  GetOptions(): Observable<Array<string>>{
    return this.http.get<Array<string>>('data/options.json');
  }

  getCounties() : Observable<Array<string>>{
    return this.http.get<Array<string>>('data/judete.json');
  }
}
