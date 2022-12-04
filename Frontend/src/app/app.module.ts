import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AlertifyService } from './services/alertify.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';

import { GMapModule } from 'primeng/gmap';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';

import { MessageService } from 'primeng/api';



import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AnnouncementCardComponent } from './announcement/announcement-card/announcement-card.component';
import { AnnouncementListComponent } from './announcement/announcement-list/announcement-list.component';
import { HousingService } from './services/housing.service';
import { AnnouncementAddComponent } from './announcement/announcement-add/announcement-add.component';
import { AnnouncementDetailComponent } from './announcement/announcement-detail/announcement-detail.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { FilterPipe } from './Pieps/Filter.pipe';
import { SortPipe } from './Pieps/Sort.pipe';
import { UserService } from './services/user.service';
import { CarService } from './services/car.service';
import { AnnouncementService } from './services/announcement.service';
import { AnnouncementDetailResolverService } from './announcement/announcement-detail/announcement-detail-resolver.service';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { FileUploadService } from './services/fileUploadService.service';
import { HomeComponent } from 'src/home/home.component';
import { IconComponent } from './icon/icon.component';
import { AnnouncementEditComponent } from './announcement/announcement-edit/announcement-edit.component';
import { UserForgotPasswordComponent } from './user/user-forgotPassword/user-forgotPassword.component';
import { UserChangePasswordComponent } from './user/user-changePassword/user-changePassword.component';
import { UserResetPasswordComponent } from './user/user-resetPassword/user-resetPassword.component';
import { UserFavoritesComponent } from './user/user-favorites/user-favorites.component';
import { UserAnnouncementService } from './services/userAnnouncement.service';
import { AnnouncementLineCardComponent } from './announcement/announcement-line-card/announcement-line-card.component';
import { CommonService } from './services/commonService.service';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserPreferencesComponent } from './user/user-preferences/user-preferences.component';
import { UserEditInformationComponent } from './user/user-edit-information/user-edit-information.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { AnnouncementMostViewedComponent } from './announcement/announcement-most-viewed/announcement-most-viewed.component';
import { AnnouncementNewestComponent } from './announcement/announcement-newest/announcement-newest.component';
import { AnnouncementRecomandationComponent } from './announcement/announcement-recomandation/announcement-recomandation.component';
import { AnnouncementSearchComponent } from './announcement/announcement-search/announcement-search.component';
import { PreferencesService } from './services/preferences.service';
import { NpnSliderModule } from 'npn-slider';
import { UserListComponent } from './admin/user-list/user-list.component';
import { UserSearchComponent } from './admin/user-search/user-search.component';
import { UserInfoComponent } from './user/user-info/user-info.component';
import { AnnouncementFavoritesComponent } from './announcement/announcement-favorites/announcement-favorites.component';
import { PriceEstimationService } from './services/priceEstimation.service';
import { PriceBarComponent } from './priceBar/priceBar.component';
import { AnnouncementUserAddedComponent } from './announcement/announcement-userAdded/announcement-userAdded.component';





const appRoutes : Routes = [
  {path : '', component : HomeComponent},
  {path : 'announcements', component : AnnouncementListComponent},
  {path : 'add-announcement', component : AnnouncementAddComponent},
  {path : 'detail-announcement/:id', component : AnnouncementDetailComponent},
  {path : 'edit-announcement/:id', component : AnnouncementEditComponent},
  {path : 'user/register', component : UserRegisterComponent},
  {path : 'user/login', component : UserLoginComponent},
  {path : 'user/forgotpassword', component : UserForgotPasswordComponent},
  {path : 'user/resetpassword/:email/:code', component : UserResetPasswordComponent},
  {path : 'user/changepassword', component : UserChangePasswordComponent},
  {path : 'user/favorites', component : UserFavoritesComponent},
  {path : 'user/profile/:id', component : UserProfileComponent},
  {path : 'user/details/:id', component : UserInfoComponent},
  {path : 'admin/users', component : UserListComponent},
  {path : 'user/announcements', component : AnnouncementUserAddedComponent},
  {path : '**', component : HomeComponent},
]

@NgModule({
  declarations: [		
    HomeComponent,
    AppComponent,
    NavBarComponent,
    AnnouncementCardComponent,
    AnnouncementListComponent,
    AnnouncementAddComponent,
    AnnouncementDetailComponent,
    UserLoginComponent,
    UserRegisterComponent,
    AnnouncementEditComponent,
    UserChangePasswordComponent,
    UserForgotPasswordComponent,
    UserResetPasswordComponent,
    UserFavoritesComponent,
    AnnouncementLineCardComponent,
    FilterPipe,
    SortPipe,
    IconComponent,
    UserProfileComponent,
    UserPreferencesComponent,
    UserEditInformationComponent,
    GoogleMapComponent,
    AnnouncementMostViewedComponent,
    AnnouncementNewestComponent,
    AnnouncementRecomandationComponent,
    AnnouncementSearchComponent,
    UserListComponent,
    UserSearchComponent,
    UserInfoComponent,
    AnnouncementFavoritesComponent,
    PriceBarComponent,
    AnnouncementUserAddedComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    NgxGalleryModule,
    GMapModule,
    DialogModule,
    FormsModule,
    ButtonModule,
    ToastModule,
    CheckboxModule,
    NpnSliderModule,
    RouterModule.forRoot([])
  ],
  providers: [
    HousingService,
    AlertifyService,
    UserService,
    CarService,
    AnnouncementService,
    AnnouncementDetailResolverService,
    FileUploadService,
    UserAnnouncementService,
    CommonService,
    MessageService,
    PreferencesService,
    PriceEstimationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
