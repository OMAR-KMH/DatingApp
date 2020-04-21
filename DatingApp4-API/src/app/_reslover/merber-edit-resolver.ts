import { AuthService } from './../_services/auth.service';
import { catchError } from 'rxjs/operators';
import { AlertifyService } from '../_services/alertify.service';
import { UsersService } from '../_services/users.service';
import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/User';
import { of, Observable } from 'rxjs';

@Injectable()

export class MerberEditResolver implements Resolve<User>
{
  constructor(private usersService: UsersService, private alertify: AlertifyService,
    private authService:AuthService
    , private router: Router) { }


  resolve(route: ActivatedRouteSnapshot): Observable<User> {

    return this.usersService.getUser(this.authService.tokenDecoded.nameid).pipe(
      catchError(error => {
        this.alertify.error("Problem in Your Retrieving Data");
        this.router.navigate(['/members']);
        return of(null);
      })
    );
  }
}
