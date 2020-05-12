import { AuthService } from './_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './_models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  jwtHelper = new JwtHelperService();

/**
 *
 */
constructor(private authservice:AuthService) {}

ngOnInit(){

  const token = localStorage.getItem('token');
  const currentUser:User= JSON.parse (localStorage.getItem('user'));
  if(token){
  this.authservice.tokenDecoded=this.jwtHelper.decodeToken(token);
}
if(currentUser){
  this.authservice.currentUser =currentUser;
  this.authservice.changeMemberPhoto(currentUser.photoUrl);
}

}



}
