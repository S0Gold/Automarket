import { Car } from "../Model/car";

export interface AnnouncementDto {
  id: number;
  vin: string;
  carId: number;
  car: Car;
  fuel: string;
  price: number;
  km: number;
  hp: number;
  cilindricalCapacity: number;
  pollution: string;
  color: string;
  photos: any[];
  user?: any;
  
}
