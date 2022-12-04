import { Photo } from "../Model/photo";

export interface AnnouncementViewDto {
  vin: string;
  brand: string;
  model: string;
  body: string;
  year: number;
  price: number;
  km: number;
  hp: number;
  cilindricalCapacity: number;
  pollution: string;
  color: string;
  description: string;
  options: Array<string>;
  photos: Array<Photo>;
  registrationDate: Date;
}
