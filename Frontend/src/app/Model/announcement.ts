import { Car } from "./car";
import { Photo } from "./photo";

export interface Announcement {
  id: number;
  vin: string;
  carId: number;
  brand: string;
  model: string;
  body: string;
  year: number;
  fuel: string;
  price: number;
  km: number;
  hp: number;
  cilindricalCapacity: number;
  pollution: string;
  color: string;
  description: string;
  photos: Array<Photo>;
  options : Array<string>;
  county : string;
  latitude : number;
  longitude : number;
  registrationDate : Date;
  user?: any;
}
