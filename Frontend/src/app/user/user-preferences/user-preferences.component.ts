import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ChangePasswordDto } from 'src/app/Dto/changePasswordDto';
import { PreferencesDto } from 'src/app/Dto/preferencesDto';
import { PreferencesRequestDto } from 'src/app/Dto/preferencesRequestDto';
import { AlertifyService } from 'src/app/services/alertify.service';
import { CarService } from 'src/app/services/car.service';
import { PreferencesService } from 'src/app/services/preferences.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-user-preferences',
  templateUrl: './user-preferences.component.html',
  styleUrls: ['./user-preferences.component.css']
})
export class UserPreferencesComponent implements OnInit {
  
  preferences : PreferencesDto ={
    Brands: [],
    Models: [],
    Bodies: [],
    Years: [],
    Counties: [],
    Fuels: [],
    Pollutions: [],
    MinKm: 0,
    MaxKm: 0
  }

  carBrands : Array<string> = [];
  carModels : Array<string> = [];
  carCategory : Array<string> = [];
  carYears : Array<string> = [];
  counties : Array<string> = [];
  carFuels :  Array<string> = ["Diesel", "Gasoline", "GPL", "Hybrid"];
  carColors :  Array<string> = ["White", "Black", "Blue", "Yellow", "Red", "Brown", "Green"];
  carPollution :  Array<string> = ["Non Euro", "Euro 1", "Euro 2", "Euro 3", "Euro 4", "Euro 5", "Euro 6"];

  constructor(private route : ActivatedRoute,
              private router : Router,
              private fb : FormBuilder,
              private service : PreferencesService,
              private alert : AlertifyService,
              private carService : CarService
              ) { }

  ngOnInit() {
    if(!localStorage.getItem('token')){ this.router.navigate(['/user/login']); }
    this.service.GetPreferences().subscribe( 
      response => { 
        if(response != null){
          this.bindData(response); 
        } 
      } );

    this.initDropDowns();
    
  }

  SelectedBrand(input : string){
    if(this.preferences.Brands.lastIndexOf(input) == -1)
      this.preferences.Brands.push(input);
  }
  SelectedModel(input : string){
    if(this.preferences.Models.lastIndexOf(input) == -1)
      this.preferences.Models.push(input);
  }
  SelectedBody(input : string){
    if(this.preferences.Bodies.lastIndexOf(input) == -1)
      this.preferences.Bodies.push(input);
  }
  SelectedYear(input : string){
    if(this.preferences.Years.lastIndexOf(+input) == -1)
      this.preferences.Years.push(+input);
  }
  SelectedCounty(input : string){
    if(this.preferences.Counties.lastIndexOf(input) == -1)
      this.preferences.Counties.push(input);
  }

  removeItem(req : string){

    if(this.preferences.Brands.lastIndexOf(req) > -1){
      this.preferences.Brands.splice(this.preferences.Brands.lastIndexOf(req), 1);
    }

    if(this.preferences.Models.lastIndexOf(req) > -1){
      this.preferences.Models.splice(this.preferences.Models.lastIndexOf(req), 1);
    }

    if(this.preferences.Bodies.lastIndexOf(req) > -1){
      this.preferences.Bodies.splice(this.preferences.Bodies.lastIndexOf(req), 1);
    }

    if(this.preferences.Years.lastIndexOf(+req) > -1){
      this.preferences.Years.splice(this.preferences.Years.lastIndexOf(+req), 1);
    }

    if(this.preferences.Counties.lastIndexOf(req) > -1){
      this.preferences.Counties.splice(this.preferences.Counties.lastIndexOf(req), 1);
    }
  }

  onClick(){
    this.service.EditPreferences(this.preferences).subscribe(
      response => { 
        this.ngOnInit();
        this.alert.success("Modificari efectuate cu succes");
        console.log(response) 
    } );
   
  }

  initDropDowns(){
    this.carService.GetBrands().subscribe( data  => { this.carBrands = data; } );
    this.carService.GetModels("n").subscribe(  data  => { this.carModels = data; } );
    this.carService.GetCategories("n","n").subscribe( data  => { this.carCategory = data; } );
    this.carService.GetYear("n", "n", "n").subscribe( data  => { this.carYears = data; } );
    this.carService.getCounties().subscribe( data  => { this.counties = data;  } );
  }

  bindData(response : PreferencesRequestDto){
    this.preferences.Brands = response.brands;
    this.preferences.Models = response.models;
    this.preferences.Bodies = response.bodies;
    this.preferences.Years = response.years;
    this.preferences.Counties = response.counties;
   // this.preferences.Fuels = response.fuels;
   // this.preferences.Pollutions = response.pollutions;
    this.preferences.MaxKm = response.maxKm;
    this.preferences.MinKm = response.minKm;
    console.log(this.preferences)
  }

 




}
