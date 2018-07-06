import { Observable } from "rxjs"
import { Injectable } from '@angular/core';
import { HttpClient , HttpResponse } from '@angular/common/http';
import {Creator} from "../models/creator.model";
import {HttpHeaders} from "@angular/common/http";
import {HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CreatorService {
  readonly apiKey: string = 'creators';
  constructor(private http: HttpClient) { }

  public getCreators(limit?:Number): Observable<any>{
    let params : string = '';
    if(limit){
      params +='?limit='+limit
    }
    return this.http.get(this.apiKey+params)
  }

  public addVisitor(creator): Observable<any>{
    let headers =  {headers: new  HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'})};
    let body = new HttpParams();
    Object.keys(creator).forEach(function (key) {
      body = body.append(key, creator[key]);
    });
    return this.http.post(this.apiKey,body.toString(),headers)
  }
}
