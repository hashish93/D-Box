import { Injectable } from '@angular/core';
import {HttpInterceptor} from "@angular/common/http";
import {HttpRequest} from "@angular/common/http";
import {HttpHandler} from "@angular/common/http";
import {Observable} from "rxjs";
import {HttpEvent} from "@angular/common/http";
import {environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class URLInterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = environment.apiEndpoint;
    req = req.clone({
      url: url + req.url
    });
    return next.handle(req);
  }
}

