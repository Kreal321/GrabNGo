import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MdbNotificationService } from "mdb-angular-ui-kit/notification";
import { AlertComponent } from "../../shared/components/alert/alert.component";



@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private notificationService: MdbNotificationService
    ) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');

        console.log('intercepted request ... ');

        return next.handle(req.clone(
            {
                headers
            }
        )).pipe(
            tap({
                // next: (event) => {
                //     if (event instanceof HttpResponse<DataResponse>) {
                //         // (event.body as DataResponse).token == null ? null : localStorage.setItem('token', (event.body as DataResponse).token);
                //     }
                // }
            }),
            catchError((error) => {
                if (error instanceof HttpErrorResponse) {
                  if (error.status == 0) {
                    this.notificationService.open(AlertComponent, {
                      stacking: true,
                      data: {
                        text: 'Network Error! Please check the backend server',
                        color: 'danger'
                      }
                    });
                    return error as any;
                  } else if (error.status == 500) {
                    this.notificationService.open(AlertComponent, {
                      stacking: true,
                      data: {
                        text: 'Internal Server Error! Please submit a bug report',
                        color: 'danger'
                      }
                    });
                    return error as any;
                  } else {
                    return throwError(() => error);
                  }
                }
            })
        ) as Observable<HttpEvent<any>>;

    }

}
