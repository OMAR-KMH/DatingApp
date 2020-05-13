import { User } from './../_models/User';
import { environment } from './../../environments/environment';
import { AlertifyService } from './alertify.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  tokenDecoded: any;
  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient, private alertify: AlertifyService) { }
    currentUser: User;
    changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }

  Login(model: any) {

    return this.http.post(this.baseUrl + 'Login', model).
      pipe(
        map(
          (response: any) => {
            const user = response;
            if (user) {
              localStorage.setItem('token', user.token);
              localStorage.setItem('user', JSON.stringify(user.user));
              this.tokenDecoded = this.jwtHelper.decodeToken(user.token);
              this.currentUser = user.user;
              this.changeMemberPhoto(this.currentUser.photoUrl);
              console.log(this.tokenDecoded);
            }
          })
      );
  }

  register(user: User) {

    return this.http.post(this.baseUrl + 'register', user);
  }


  LoggedIn() {

    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);

  }

}





