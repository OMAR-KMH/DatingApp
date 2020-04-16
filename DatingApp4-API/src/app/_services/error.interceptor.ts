import { Injectable } from '@angular/core';
import { HttpInterceptingHandler, interceptingHandler } from '@angular/common/http/src/module';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, pipe, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { error } from 'protractor';
import { type } from 'os';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      // tslint:disable-next-line: no-shadowed-variable
      catchError(error => {
        if (error instanceof HttpErrorResponse) {

          if (error.status === 401) {
            return throwError(error.statusText);
          }

          const applicationerror = error.headers.get('Application-Error');
          if (applicationerror) {
            console.log(applicationerror);
            return throwError(applicationerror);
          }

          // array of  error from user
          const serverError = error.error;
          let modalStateError = '';
          if (serverError && typeof serverError === 'object') {
            for (const key in serverError) {
              if (serverError[key]) {
                // tslint:disable-next-line: no-unused-expression
                modalStateError += serverError[key] + '\n';
              }
            }

          }
          return throwError(modalStateError || serverError || 'Server Error');

        }
      }
      )
    );

  }

}

export const ErrorInterceptorProvider = {

  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
