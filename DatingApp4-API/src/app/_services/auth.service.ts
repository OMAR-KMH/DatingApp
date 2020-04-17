import { AlertifyService } from './alertify.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';
  jwtHelper = new JwtHelperService();
  tokenDecoded :any;
  constructor(private http: HttpClient,private alertify :AlertifyService) { }

  Login(model: any) {

    return this.http.post(this.baseUrl + 'Login', model).
      pipe(
        map(
          (response: any) => {
            const user = response;
            if (user) {
              localStorage.setItem('token', user.token);
              this.tokenDecoded = this.jwtHelper.decodeToken(user.token);
               console.log(this.tokenDecoded);
            }
          })
      );
  }

  register(model: any) {

    return this.http.post(this.baseUrl + 'register', model);
  }


LoggedIn(){

  const token= localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);

}

}





