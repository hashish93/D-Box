import { Injectable } from '@angular/core';
import {HttpInterceptor} from "@angular/common/http";
import {HttpRequest} from "@angular/common/http";
import {HttpEvent} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {AuthService} from "../auth-service.service";
import {HttpHandler} from "@angular/common/http";
import {catchError} from "rxjs/internal/operators";
import {NotificationsService} from 'angular2-notifications';
import {Router} from '@angular/router';

@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(public authService : AuthService , public notificationService : NotificationsService , public router : Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        // auto logout if 401 response returned from api
          localStorage.clear();
        // location.reload(true);
      }
      if(err.status === 404){
        this.notificationService.error('خطأ 404', 'لا يوجد هذا ال url',{timeOut:3000})
        this.router.navigate(['']);

      }

      // const error = err.error.message || err.statusText;
      return throwError(err);
    }))
  }

}

