import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, NgSelectOption, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { AnnouncementAddDto } from 'src/app/Dto/announcementAddDto';
import { AnnouncementDto } from 'src/app/Dto/announcementDto';
import { Announcement } from 'src/app/Model/announcement';
import { Car } from 'src/app/Model/car';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { CarService } from 'src/app/services/car.service';
import { CommonService } from 'src/app/services/commonService.service';
import { FileUploadService } from 'src/app/services/fileUploadService.service';

@Component({
  selector: 'app-announcement-edit',
  templateUrl: './announcement-edit.component.html',
  styleUrls: ['./announcement-edit.component.css']
})
export class AnnouncementEditComponent implements OnInit {

  @ViewChild('formTabs') formTabs?: TabsetComponent;

  editForm! : FormGroup;
  announcementId! : number;
  announcement! : Announcement ; 

  submited = false;
  primaryPhoto!: string;

  carBrands : Array<string> = [];
  carModels : Array<string> = [];
  carCategory : Array<string> = [];
  carYears : Array<string> = [];
  counties : Array<string> = [];
  carFuels :  Array<string> = ["Motorină", "Benzină", "GPL", "Hibrid"];
  carColors :  Array<string> = ["Alb", "Negru", "Albastru", "Galben", "Rosu", "Maro", "Verde", "Gri"];
  carPollution :  Array<string> = ["Non Euro", "Euro 1", "Euro 2", "Euro 3", "Euro 4", "Euro 5", "Euro 6"];
  options : string[] = [];
  optionsChosen :string[] = [];
  primaryPhotoIndex! : number;
  images : any = [];
  files: File[] = []; // Variable to store file
  

  constructor(private fb: FormBuilder,
              private router : Router,
              private carService : CarService,
              private announcementService : AnnouncementService,
              private fileUploadService: FileUploadService,
              private alertify : AlertifyService,
              private route : ActivatedRoute,
              private Service : CommonService
            ) { }

  ngOnInit() {
    
    this.announcementId = Number(this.route.snapshot.params['id']);
    this.announcementService.GetAnnouncementById(this.announcementId).subscribe(
      (data: Announcement) =>{        
        this.announcement = data;
        console.log(this.announcement);
        this.optionsChosen = data.options;
        this.getPrimaryPhoto();
        this.getCarDetails();
        this.createEditForm();
      }, error => this.router.navigate(['/'])
      );
      
  }

  getPrimaryPhoto(){
    let primary : string ='';
    let index : number = 0;
    if(this.announcement.photos){
      this.announcement.photos.forEach(element => {
        this.images.push(element.imageUrl);
        this.files.push(new File([element.publicId], element.imageUrl));
        if(element.isPrimary){
          this.primaryPhoto = element.imageUrl;
          this.primaryPhotoIndex = index;
        }
        index++;
      });
    }
  }
  
  getCarDetails(){
    this.carService.GetOptions().subscribe(
      data  => {
        this.options = data;
      }
    );
    this.carService.GetBrands().subscribe(
      data  => {
        this.carBrands = data;
      }
    );
    this.carService.GetModels(this.announcement.brand).subscribe(
      data  => {
        this.carModels = data;
      }
    );
    this.carService.getCounties().subscribe(
      data  => {
        this.counties = data;
      }
    );

    if(this.announcement.brand && this.announcement.model){
      this.carService.GetCategories(this.announcement.brand, this.announcement.model).subscribe(
        data  => {
          this.carCategory = data;
        }
      );
    }
    if(this.announcement.brand && this.announcement.model && this.announcement.body){
      this.carService.GetYear(this.announcement.brand, this.announcement.model, this.announcement.body).subscribe(
          data  => {
            this.carYears = data;
          }
        );
      }
  }

  onSelectedBrand(input : string){

    this.announcement.brand = input;
    this.announcement.model = '';
    this.announcement.body = '';
    this.announcement.year = 0;
    this.model.reset();
    this.body.reset();
    this.year.reset();
    this.model.enable();
    this.body.disable();
    this.year.disable();

    if(this.announcement.brand){
      this.carService.GetModels(this.announcement.brand).subscribe(
        data  => {
          this.carModels = data;
        }
      );
    }
  }

  onSelectedModel(input : string){
    if(input == null) return;

    this.announcement.model = input;
    this.announcement.body = '';
    this.announcement.year = 0;
    this.body.enable();
    this.year.disable();
    this.body.reset();
    this.year.reset();

    if(this.announcement.brand && this.announcement.model){
      this.carService.GetCategories(this.announcement.brand, this.announcement.model).subscribe(
        data  => {
          this.carCategory = data;
        }
      );
    }
  }

  onSelectedBody(input : string){
    if(input == null) return;

    this.announcement.body = input;
    this.announcement.year = 0;
    this.year.reset();
    this.year.enable();
    this.body.setValue(input);
    console.log(this.body.value);

    if(this.announcement.brand && this.announcement.model && this.announcement.body){
      this.carService.GetYear(this.announcement.brand, this.announcement.model, this.announcement.body)
                    .subscribe(
                      data  => {
                        this.carYears = data;
                      }
                    );
    }
  }

  onSubmit(){
    let announcementDto : AnnouncementAddDto= {
      VIN: this.announcement.vin,
      Brand: this.announcement.brand,
      Model: this.announcement.model,
      Body: this.announcement.body,
      Year: this.announcement.year,
      Fuel: this.fuel.value,
      Price: this.announcement.price,
      Km: this.km.value,
      Hp: this.hp.value,
      CilindricalCapacity: this.cilindricalCapacity.value,
      Pollution: this.pollution.value,
      Color: this.color.value,
      Description: this.description.value,
      County: this.announcement.county,
      Latitude: this.announcement.latitude,
      Longitude: this.announcement.longitude,
      Options: this.optionsChosen,
      Photos: this.announcement.photos,
    };

    this.announcementService.EditAnnouncement(announcementDto, this.announcementId).subscribe(
      response => {
        console.log(response);
        this.fileUploadService.update(this.files, this.announcementId, this.primaryPhotoIndex).subscribe(
          response => {
            console.log(response);
            this.alertify.success('successfully!');
            setTimeout(() => {
              this.router.navigate(['/announcements']);
          }, 3000);  //5s
          }, error =>{
            console.log(error);
            this.alertify.error(error.error);
          });
      }, error =>{
        console.log(error);
        this.alertify.error(error.error);
      });
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
                   this.editForm.patchValue({
                      fileSource: this.images
                   });
                }
                reader.readAsDataURL(event.target.files[i]);
        }
    }
  }

  removePhoto(item :any) {
    let index = this.images.lastIndexOf(item) ;
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
      console.log(tabId);
    }
  }

  createEditForm(){
    this.editForm = this.fb.group( {
      brand: [null, [Validators.required]],
      model: [null, [Validators.required]],
      body: [null, [Validators.required]],
      year: [null, [Validators.required]],
      vin: [null, [Validators.required, Validators.minLength(17), Validators.maxLength(17)]],
      fuel:[null, [Validators.required]],
      price: [null, [Validators.required, Validators.min(1)]],
      km: [null, [Validators.required, Validators.min(1)]],
      hp: [null, [Validators.required, Validators.min(1)]],
      cilindricalCapacity: [null, [Validators.required, Validators.min(1)]],
      pollution: [null, [Validators.required]],
      color :[null, [Validators.required]],
      description: [null, [Validators.required, Validators.minLength(50)]],
      file: [null, [Validators.required]],
      county: [null, [Validators.required]],
      latitude: [null, [Validators.required]],
      longitude: [null, [Validators.required]],
      });
  }
  get brand() {
    return this.editForm.get('brand') as FormControl;
  }
  get model() {
    return this.editForm.get('model') as FormControl;
  }
  get body() {
    return this.editForm.get('body') as FormControl;
  }
  get year() {
    return this.editForm.get('year') as FormControl;
  }
  get vin() {
    return this.editForm.get('vin') as FormControl;
  }
  get fuel() {
    return this.editForm.get('fuel') as FormControl;
  }
  get price() {
    return this.editForm.get('price') as FormControl;
  }
  get km() {
    return this.editForm.get('km') as FormControl;
  }
  get hp() {
    return this.editForm.get('hp') as FormControl;
  }
  get cilindricalCapacity() {
    return this.editForm.get('cilindricalCapacity') as FormControl;
  }
  get pollution() {
    return this.editForm.get('pollution') as FormControl;
  }
  get color() {
    return this.editForm.get('color') as FormControl;
  }
  get description() {
    return this.editForm.get('description') as FormControl;
  }
  get county() {
    return this.editForm.get('county') as FormControl;
  }
  get latitude() {
    return this.editForm.get('latitude') as FormControl;
  }
  get longitude() {
    return this.editForm.get('longitude') as FormControl;
  }
  get file(){
    return this.editForm.get('file') as FormControl
  }
}
