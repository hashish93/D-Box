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
  constructor(public  http: HttpClient) { }

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

  getCreator(id: Number) : Observable<any> {
    return this.http.get(this.apiKey+'/'+id)
  }

  getFormData(object) {
  const formData = new FormData();
  Object.keys(object).forEach(key => formData.append(key, object[key]));
  return formData;
  }

  updateCreator(user: Creator,file: any) : Observable<any> {
    user._method = 'put';
    delete user.email;
    if(file){
      user.avatar=file;
    }
    let userData = this.getFormData(user);
    return this.http.post('auth/user',userData)
  }

  getUser() : Observable<any> {
    return this.http.get('auth/user')
  }
}
