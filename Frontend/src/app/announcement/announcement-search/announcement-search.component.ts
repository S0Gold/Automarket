import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchDto } from 'src/app/Dto/searchDto';
import { Announcement } from 'src/app/Model/announcement';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { CarService } from 'src/app/services/car.service';
import { CommonService } from 'src/app/services/commonService.service';

@Component({
  selector: 'app-announcement-search',
  templateUrl: './announcement-search.component.html',
  styleUrls: ['./announcement-search.component.css']
})
export class AnnouncementSearchComponent implements OnInit {

 
  @Output() announcementsChange = new EventEmitter<Array<Announcement>>();

  searchForm! : FormGroup;
  dataModel : SearchDto = {
    Brand: '',
    Model: '',
    Body: '',
    Year: 0,
    County: '',
    Fuel: '',
    MinPrice: 0,
    MaxPrice: 30000
  }
  
  announcements! : Array<Announcement>;
  carBrands : Array<string> = [];
  carModels : Array<string> = [];
  carCategory : Array<string> = [];
  carYears : Array<string> = [];
  counties : Array<string> = [];
  carFuels :  Array<string> = ["Diesel", "Gasoline", "GPL", "Hybrid"];


  constructor(private fb: FormBuilder,
              private carService : CarService,
              private announcementService : AnnouncementService,
              private alertify : AlertifyService,
            ) { }

  ngOnInit() {
    this.createForm();
    this.getDataFromDb();
  }

  onSubmit(){
    this.announcementService.GetAllAnnouncementsByParams(this.dataModel).subscribe(
      response => {
        this.announcements = response;
        this.announcementsChange.emit(this.announcements);
        console.log(this.announcements);  
        this.alertify.success('successfully!');
      }, error =>{
        console.log(error);
        this.alertify.error(error.errors);
      });
  }

  onSliderChange(selectedValues: number[]) {
    this.dataModel.MinPrice = selectedValues[0];
    this.dataModel.MaxPrice = selectedValues[1];
}

  listChange(input : string){
    switch(input){
     case "model" : {
      this.carService.GetModels(this.dataModel.Brand).subscribe( data  => { this.carModels = data; } );
      break;
    }  
     case "body" : {
       if(this.dataModel.Brand != null)
        this.carService.GetCategories(this.dataModel.Brand, this.dataModel.Model).subscribe( data  => { this.carCategory = data; } );
        break;
     }
     case "year" : {
        if(this.dataModel.Brand != null && this.dataModel.Model != null)
          this.carService.GetYear(this.dataModel.Brand, this.dataModel.Model, this.dataModel.Body).subscribe( data  => { this.carYears = data; } );
        break;
     } 
    }


  }
  getDataFromDb(){
    this.carService.GetBrands().subscribe( data  => { this.carBrands = data; });
    this.carService.GetModels("n").subscribe( data  => { this.carModels = data; } );
    this.carService.GetCategories("n","n").subscribe( data  => { this.carCategory = data; } );
    this.carService.GetYear("n","n","n").subscribe( data  => { this.carYears = data; } );
    this.carService.getCounties().subscribe( data  => { this.counties = data; } );
  }

  createForm(){
    this.searchForm = this.fb.group( {
      brand: [null, [Validators.required]],
      model: [null, [Validators.required]],
      body: [null, [Validators.required]],
      year: [null, [Validators.required, Validators.min(1)]], 
      fuel: [null, [Validators.required]],   
      county: [null, [Validators.required]],
      });
  }

  get brand() {
    return this.searchForm.get('brand') as FormControl;
  }
  get model() {
    return this.searchForm.get('model') as FormControl;
  }
  get body() {
    return this.searchForm.get('body') as FormControl;
  }
  get year() {
    return this.searchForm.get('year') as FormControl;
  }
  get fuel() {
    return this.searchForm.get('fuel') as FormControl;
  }
  get county() {
    return this.searchForm.get('county') as FormControl;
  }


}
