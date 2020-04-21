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

  updateUser(id: number, user: User) {
   return this.http.put(this.apiUrl + 'users/' + id, user)
  }

}
