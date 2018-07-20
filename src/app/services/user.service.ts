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

  public getEvents(): Observable<any> {
    const dateObj = new Date();
    const yearMonth = dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);


    let data: any = [{
      title: 'All Event',
      start: yearMonth + '-01'
      ,
    }];
    return of(data);
  }

  getUserData(): Observable<any> {
    return this.http.get("auth/user");

  }
}
