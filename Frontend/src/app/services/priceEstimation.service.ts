import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PriceEstimationDto } from '../Dto/PriceEstimationDto';
import { PriceEstimatioResponseDto } from '../Dto/priceEstimatioResponseDto';
import { Announcement } from '../Model/announcement';

@Injectable({
  providedIn: 'root'
})
export class PriceEstimationService {

  baseUrl = 'https://localhost:7039/api/PriceEstimation/';

  constructor(private http : HttpClient) { }

  getPriceEstimation(announcement : Announcement){

    let data : PriceEstimationDto = {
      CarId: announcement.carId,
      Km: announcement.km,
      Price: announcement.price,
      Fuel: announcement.fuel
    }

    return this.http.post<PriceEstimatioResponseDto>(this.baseUrl+"GetPriceEstimation", data);
  }
}
