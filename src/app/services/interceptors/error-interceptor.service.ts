import { Injectable } from '@angular/core';
import {HttpInterceptor} from "@angular/common/http";
import {HttpRequest} from "@angular/common/http";
import {HttpEvent} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {AuthService} from "../auth-service.service";
import {HttpHandler} from "@angular/common/http";
import {catchError} from "rxjs/internal/operators";

@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(public authService : AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        this.authService.logout();
        // location.reload(true);
      }

      // const error = err.error.message || err.statusText;
      return throwError(err);
    }))
  }

}

