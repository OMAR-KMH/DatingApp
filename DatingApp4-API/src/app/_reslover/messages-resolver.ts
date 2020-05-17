import { AuthService } from './../_services/auth.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { catchError } from 'rxjs/operators';
import { AlertifyService } from '../_services/alertify.service';
import { UsersService } from '../_services/users.service';
import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/User';
import { of, Observable } from 'rxjs';

@Injectable()

export class MessagesResolver implements Resolve<Message[]>
{
  pageNumber = 1;
  pageSize = 5;
  messageContainer = 'Unread';

  constructor(private usersService: UsersService, private alertify: AlertifyService,
     private authService: AuthService , private router: Router) { }


  resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
    return this.usersService.getMessages(this.authService.tokenDecoded.nameid, this.pageNumber,
       this.pageSize, this.messageContainer).pipe(
      catchError(error => {
        this.alertify.error("Problem in Retrieving Messages");
        this.router.navigate(['/home']);
        return of(null);
      })
    );
  }
}
