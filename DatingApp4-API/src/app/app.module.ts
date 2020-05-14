import { MemberDetailComponent } from './member-list/member-detail/member-detail.component';
import { AuthGuard } from './_guards/auth.guard';
import { RouterModule } from '@angular/router';
import { AlertifyService } from './_services/alertify.service';
import { BsDropdownModule, TabsModule, BsDatepickerModule, PaginationModule, ButtonsModule } from 'ngx-bootstrap';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TimeAgoPipe} from 'time-ago-pipe';


import { AuthService } from './_services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxGalleryModule } from 'ngx-gallery';
import {FileUploadModule} from 'ng2-file-upload'

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
// import { MembersComponent } from './members/members.component';
import { MessagesComponent } from './messages/messages.component';
import { appRoutes } from './routes';
import { UsersService } from './_services/users.service';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberCardComponent } from './member-list/member-card/member-card.component';
import { MerberDetailsResolver } from './_reslover/merber-details-resolver';
import { MerberListsResolver } from './_reslover/merber-lists-resolver';
import { ListsComponent } from './lists/lists.component';
import { MemberEditComponent } from './member-list/member-edit/member-edit.component';
import { MerberEditResolver } from './_reslover/merber-edit-resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { EditPhotoComponent } from './member-list/edit-photo/edit-photo.component';


export function tokenGetter(){
return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      NavbarComponent,
      HomeComponent,
      RegisterComponent,
      MessagesComponent,
      MemberListComponent,
      MemberCardComponent,
      MemberDetailComponent,
      ListsComponent,
      MemberEditComponent,
      EditPhotoComponent,
      TimeAgoPipe
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      PaginationModule.forRoot(),
      ButtonsModule.forRoot(),
      TabsModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      NgxGalleryModule,
      FileUploadModule,
      JwtModule.forRoot({
        config:{
          tokenGetter : tokenGetter,
          whitelistedDomains:['localhost:5000'],
          blacklistedRoutes:['localhost:5000/api/auth']

        }
      })
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      AlertifyService,
      AuthGuard,
      UsersService,
      MerberDetailsResolver,
      MerberListsResolver,
      MerberEditResolver,
      PreventUnsavedChanges
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
