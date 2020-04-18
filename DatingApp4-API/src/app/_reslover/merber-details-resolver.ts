import { catchError } from 'rxjs/operators';
import { AlertifyService } from '../_services/alertify.service';
import { UsersService } from '../_services/users.service';
import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/User';
import { of, Observable } from 'rxjs';

@Injectable()

export class MerberDetailsResolver implements Resolve<User>
{
  constructor(private usersService: UsersService, private alertify: AlertifyService
    , private router: Router) { }


  resolve(route: ActivatedRouteSnapshot): Observable<User> {

    return this.usersService.getUser(route.params['id']).pipe(
      catchError(error => {
        this.alertify.error("Problem in Retrieving Data");
        this.router.navigate(['/members']);
        return of(null);
      })
    );
  }
}
