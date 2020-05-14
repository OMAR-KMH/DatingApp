import { catchError } from 'rxjs/operators';
import { AlertifyService } from '../_services/alertify.service';
import { UsersService } from '../_services/users.service';
import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/User';
import { of, Observable } from 'rxjs';

@Injectable()

export class MerberListsResolver implements Resolve<User[]>
{
  pageNumber = 1;
  pageSize = 5;
  constructor(private usersService: UsersService, private alertify: AlertifyService
    , private router: Router) { }


  resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
    return this.usersService.getUsers(this.pageNumber,this.pageSize).pipe(
      catchError(error => {
        this.alertify.error("Problem in Retrieving Data");
        this.router.navigate(['/home']);
        return of(null);
      })
    );
  }
}
