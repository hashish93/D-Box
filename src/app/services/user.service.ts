import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subscriber} from "rxjs";
import { of } from 'rxjs';
import {moment} from "ngx-bootstrap/chronos/test/chain";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(public  http: HttpClient) { }

  getRevenue(month: number, year: number) : Observable<any> {
    return this.http.get("auth/statistics/revenue?month=" + month + '&year=' + year);
  }
  getStatistics(month: number, year: number) : Observable<any> {
    return this.http.get("auth/statistics/views?month=" + month + '&year=' + year);
  }

  getUserData(): Observable<any> {
    let user = JSON.parse(localStorage.getItem('user'));
    if(user){
      return new Observable((observer) => {
        observer.next(user);
        observer.complete();
      });

    }
    return this.http.get("auth/user");

  }
}
