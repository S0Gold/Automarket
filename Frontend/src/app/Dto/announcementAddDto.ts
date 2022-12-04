import { Car } from "../Model/car";
import { Photo } from "../Model/photo";

export interface AnnouncementAddDto {
  VIN: string;
  Brand:string;
  Model:string;
  Body:string;
  Year:number;
  Fuel: string;
  Price: number;
  Km: number;
  Hp: number;
  CilindricalCapacity: number;
  Pollution: string;
  Color: string;
  Description: string;
  Options : Array<string>;
  County : string;
  Latitude : number;
  Longitude : number;
  Photos? : Array<Photo>;

}
