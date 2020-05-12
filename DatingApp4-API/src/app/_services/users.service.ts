import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {

    return this.http.get<User[]>(this.apiUrl + 'users');
  }

  getUser(id): Observable<User> {

    return this.http.get<User>(this.apiUrl + 'users/' + id);
  }


  //update
  updateUser(id: number, user: User) {
    return this.http.put(this.apiUrl + 'users/' + id, user)
  }

  setMainPhoto(userId: number, id: number) {
    // http://localhost:5000/api/users/245/photos/265/setMain
    return this.http.post(this.apiUrl + 'users/' + userId + '/photos/' + id + '/setMain', {});

  }
  deletePhoto(userId: number, id: number) {
   return this.http.delete(this.apiUrl + "users/" + userId + "/photos/" + id);
  }

}
