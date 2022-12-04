import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, NgSelectOption, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { AnnouncementAddDto } from 'src/app/Dto/announcementAddDto';
import { AnnouncementDto } from 'src/app/Dto/announcementDto';
import { Announcement } from 'src/app/Model/announcement';
import { Car } from 'src/app/Model/car';
import { Photo } from 'src/app/Model/photo';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { CarService } from 'src/app/services/car.service';
import { CommonService } from 'src/app/services/commonService.service';
import { FileUploadService } from 'src/app/services/fileUploadService.service';
import { HousingService } from 'src/app/services/housing.service';


@Component({
  selector: 'app-announcement-add',
  templateUrl: './announcement-add.component.html',
  styleUrls: ['./announcement-add.component.css']
})
export class AnnouncementAddComponent implements OnInit {

  @ViewChild('formTabs') formTabs?: TabsetComponent;

  submited! : boolean;
  addForm! : FormGroup;

  carBrands : Array<string> = [];
  carModels : Array<string> = [];
  carCategory : Array<string> = [];
  carYears : Array<string> = [];
  counties : Array<string> = [];
  carFuels :  Array<string> = ["Motorină", "Benzină", "GPL", "Hibrid"];
  carColors :  Array<string> = ["Alb", "Negru", "Albastru", "Galben", "Rosu", "Maro", "Verde", "Gri"];
  carPollution :  Array<string> = ["Non Euro", "Euro 1", "Euro 2", "Euro 3", "Euro 4", "Euro 5", "Euro 6"];
  files: File[] = []; // Variable to store file
  images : any = [];
  primaryPhoto: string = "empty";
  primaryPhotoIndex: number = 0;
  announcementView : Announcement = {
    id: 0,
    vin: '',
    carId: 0,
    brand: '',
    model: '',
    body: '',
    year: 0,
    fuel: '',
    price: 0,
    km: 0,
    hp: 0,
    cilindricalCapacity: 0,
    pollution: '',
    color: '',
    photos: [],
    description: '',
    options: [],
    county: '',
    latitude: 0,
    longitude: 0,
    registrationDate: new Date
  };
  options : string[] = [];
  optionsChosen :string[] = [];

  constructor(private fb: FormBuilder,
              private route : Router,
              private carService : CarService,
              private announcementService : AnnouncementService,
              private fileUploadService: FileUploadService,
              private alertify : AlertifyService,
              private Service: CommonService
            ) { }

 ngOnInit() {
   if(!localStorage.getItem('user')){
    this.route.navigate(['/user/login']);
   }
    this.submited = false;
    this.createAddForm();
    this.model.disable();
    this.body.disable();
    this.year.disable();
    this.carService.GetBrands().subscribe(
      data  => {
        this.carBrands = data;
      }
    );
    this.carService.GetOptions().subscribe(
      data  => {
        this.options = data;
      }
    );
    this.carService.getCounties().subscribe(
      data  => {
        this.counties = data;
        console.log(this.counties);
      }
    );

    if(navigator.geolocation){    
      navigator.geolocation.getCurrentPosition(
        (position) => {   
          this.announcementView.latitude = position.coords.latitude;
          this.announcementView.longitude = position.coords.longitude;
        })};

  }

  onSelectedBrand(input : string){

    this.announcementView.brand = input;
    this.announcementView.model = '';
    this.announcementView.body = '';
    this.announcementView.year = 0;
    this.model.enable();
    this.body.disable();
    this.year.disable();

    if(this.announcementView.brand){
      this.carService.GetModels(this.announcementView.brand).subscribe(
        data  => {
          this.carModels = data;
        }
      );
    }
  }
  onSelectedModel(input : string){
    if(input == null) return;

    this.announcementView.model = input;
    this.announcementView.body = '';
    this.announcementView.year = 0;
    this.body.enable();
    this.year.disable();

    if(this.announcementView.brand && this.announcementView.model){
      this.carService.GetCategories(this.announcementView.brand, this.announcementView.model).subscribe(
        data  => {
          this.carCategory = data;
        }
      );
    }
  }
  onSelectedBody(input : string){
    if(input == null) return;

    this.announcementView.body = input;
    this.announcementView.year = 0;
    this.year.enable();

    if(this.announcementView.brand && this.announcementView.model && this.announcementView.body){
      this.carService.GetYear(this.announcementView.brand, this.announcementView.model, this.announcementView.body)
                    .subscribe(
                      data  => {
                        this.carYears = data;
                      }
                    );
    }
  }

  onSubmit(){
    this.submited = true;

    if(this.addForm.valid){
    let announcementDto : AnnouncementAddDto= {
      VIN: this.announcementView.vin,
      Brand:this.announcementView.brand,
      Model:this.announcementView.model,
      Body:this.announcementView.body,
      Year:this.announcementView.year,
      Fuel: this.fuel.value,
      Price: this.announcementView.price,
      Km: this.km.value,
      Hp: this.hp.value,
      CilindricalCapacity: this.cilindricalCapacity.value,
      Pollution: this.pollution.value,
      Color: this.color.value,
      Description: this.description.value,
      County : this.announcementView.county,
      Latitude : this.announcementView.latitude,
      Longitude : this.announcementView.longitude,
      Options: this.optionsChosen,
    };

    this.announcementService.AddAnnouncement(announcementDto).subscribe(
      response => {
        console.log(response);
        this.fileUploadService.upload(this.files, response, this.primaryPhotoIndex).subscribe(
          response => {
            console.log(response);
            this.alertify.success('successfully!');
            setTimeout(() => {
              this.route.navigate(['/announcements']);
          }, 3000);  //5s
          }, error =>{
            console.log(error);
            this.alertify.error(error.errors);
          });
      }, error =>{
        console.log(error);
        this.alertify.error(error.errors);
      });
    }
    else{
      console.log(this.addForm)
       this.alertify.error('Kindly, provide the requierd fields');
    }
  }

  onFileChange(event :  any) {
    console.log(event.target.files);
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
               this.files.push(event.target.files[i]);
                var reader = new FileReader();
                reader.onload = (event:any) => {
                   this.images.push(event.target.result);
                   this.addForm.patchValue({
                      fileSource: this.images
                   });
                   if(this.primaryPhoto == "empty"){
                    this.primaryPhoto = this.images[0];
                    localStorage.setItem('photo', this.images[0]);
                    this.Service.sendUpdate("");
                  }
                }
                reader.readAsDataURL(event.target.files[i]);
        }      
    }
  }

  removePhoto(item :any) {
    const index = this.images.lastIndexOf(item) ;
    if (index > -1) {
      this.images.splice(index, 1);
      this.files.splice(index, 1);
    }
  }

  makePrimaryPhoto(item :any) {
    
    this.primaryPhotoIndex = this.images.lastIndexOf(item) ;
    this.primaryPhoto = this.images[this.primaryPhotoIndex];

    localStorage.setItem('photo', this.images[this.primaryPhotoIndex]);
    this.Service.sendUpdate("");

    console.log(this.primaryPhotoIndex);
    this.alertify.success("Your primary photo has been changed.")
  }

  onCheck(input :string){
    if(this.optionsChosen.find(element => element === input)){
      this.optionsChosen.forEach((element,index)=>{
        if(element==input) this.optionsChosen.splice(index,1);
        console.log(this.optionsChosen);
      });
    }
    else{
      this.optionsChosen.push(input);
      console.log(this.optionsChosen);
    }

  }


  selectTab(tabId: number) {
    if (this.formTabs?.tabs[tabId]) {
      this.formTabs.tabs[tabId].active = true;
    }
  }

  createAddForm(){
    this.addForm = this.fb.group( {
      brand: [null, [Validators.required]],
      model: [null, [Validators.required]],
      body: [null, [Validators.required]],
      year: [null, [Validators.required, Validators.min(1)]],
      vin: [null, [Validators.required, Validators.minLength(17), Validators.maxLength(17)]],
      fuel:[null, [Validators.required]],
      price: [null, [Validators.required, Validators.min(1)]],
      km: [null, [Validators.required, Validators.min(1)]],
      hp: [null, [Validators.required, Validators.min(1)]],
      cilindricalCapacity: [null, [Validators.required, Validators.min(500)]],
      pollution: [null, [Validators.required]],
      color :[null, [Validators.required]],
      description: [null, [Validators.required, Validators.minLength(50)]],
      file: [null, [Validators.required]],
      county: [null, [Validators.required]],
      });
  }

  get brand() {
    return this.addForm.get('brand') as FormControl;
  }
  get model() {
    return this.addForm.get('model') as FormControl;
  }
  get body() {
    return this.addForm.get('body') as FormControl;
  }
  get year() {
    return this.addForm.get('year') as FormControl;
  }
  get vin() {
    return this.addForm.get('vin') as FormControl;
  }
  get fuel() {
    return this.addForm.get('fuel') as FormControl;
  }
  get price() {
    return this.addForm.get('price') as FormControl;
  }
  get km() {
    return this.addForm.get('km') as FormControl;
  }
  get hp() {
    return this.addForm.get('hp') as FormControl;
  }
  get cilindricalCapacity() {
    return this.addForm.get('cilindricalCapacity') as FormControl;
  }
  get pollution() {
    return this.addForm.get('pollution') as FormControl;
  }
  get color() {
    return this.addForm.get('color') as FormControl;
  }
  get description() {
    return this.addForm.get('description') as FormControl;
  }
  get county() {
    return this.addForm.get('county') as FormControl;
  }
  get file(){
    return this.addForm.get('file') as FormControl
  }
}
