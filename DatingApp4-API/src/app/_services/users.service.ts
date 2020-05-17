import { map } from 'rxjs/operators';
import { User } from './../_models/User';
import { PaginationResult } from './../_models/Pagination';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Message } from '../_models/Message';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }



  getUsers(page?, itemsPerPage?, userParams?, likeParams?): Observable<PaginationResult<User[]>> {
    const paginationResult: PaginationResult<User[]> = new PaginationResult<User[]>();

    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append("PageNumber", page);
      params = params.append("pageSize", itemsPerPage);
    }
    if (userParams != null) {
      params = params.append("minAge", userParams.minPage);
      params = params.append("maxAge", userParams.maxAge);
      params = params.append("gender", userParams.gender);
      params = params.append("orderBy", userParams.orderBy);
    }
    if (likeParams == 'Likers') {
      params = params.append("Likers", "true");
    }
    if (likeParams == 'Likees') {
      params = params.append("Likees", "true")
    }
    return this.http.get<User[]>(this.apiUrl + 'users', { observe: 'response', params })
      .pipe(map(response => {
        paginationResult.result = response.body;
        if (response.headers.get("Pagination") != null) {
          paginationResult.pagination = JSON.parse(response.headers.get("Pagination"));
          return paginationResult;
        }
      }));
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

  sendLike(id: number, reciptionId: number) {
    return this.http.post(this.apiUrl + "users/" + id + "/like/" + reciptionId, {});
  }

  getMessages(id: number, page?, itemsPerPage?, messageContainer?) {

    const paginationResult: PaginationResult<Message[]> = new PaginationResult<Message[]>();
    let params = new HttpParams();

    params = params.append("MessageContainer", messageContainer);

    if (page != null && itemsPerPage != null) {
      params = params.append("PageNumber", page);
      params = params.append("pageSize", itemsPerPage);
    }

    return this.http.get<Message[]>(this.apiUrl + "users/" + id + "/messages", { observe: "response", params })
      .pipe(
        map(response => {
          paginationResult.result = response.body;

          if (response.headers.get("Pagination") != null) {
            paginationResult.pagination = JSON.parse(response.headers.get("Pagination"));
          }
          return paginationResult;
        })
      );
  }


  getMessageThread(id: number, recipentId: number) {
    return this.http.get(this.apiUrl + "users/" + id + "/messages/thread/" + recipentId);
  }

  sendMessage(id: number, newMessage) {
    return this.http.post(this.apiUrl + "users/" + id + "/messages", newMessage);
  }

  deleteMessage(id: number, userId: number) {
    return this.http.post(this.apiUrl + "users/" + userId + "/messages/" + id, {});
  }

  markAsRead(userId: number, messageId: number) {
    this.http.post(this.apiUrl + "users/" + userId + "/messages/" + messageId + "/read",{}).subscribe();
  }

}
