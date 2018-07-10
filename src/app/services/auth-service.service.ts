import { Injectable } from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {Observable} from "rxjs";
import {User} from "../models/user.model";
import {HttpHeaders} from "@angular/common/http";
import {HttpParams} from "@angular/common/http";
import {HttpClient} from "@angular/common/http";
import {Creator} from "../models/creator.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public jwtHelper: JwtHelperService, public http : HttpClient) { }
  public  getHeaders(): any{
    return {headers: new  HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'})};
  }
  public convertJsonToPostParams(obj) : any{
    let body = new HttpParams();
    Object.keys(obj).forEach(function (key) {
      body = body.append(key, obj[key]);
    });
    return body.toString()
  }

  public login(user : User): Observable<any>{
    return this.http.post('login',this.convertJsonToPostParams(user).toString(),this.getHeaders())
  }

  public logout(): Observable<any>{
    return this.http.get('auth/logout');
  }
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  forgetPassword(email: string) {
    return this.http.get('password/email?email='+email);
  }

  verifyCode(email: string, code: string) {
    return this.http.get('password/token?token='+code+'&email='+email);
  }

  resetPassword(user: Creator) {
    return this.http.post('password/reset',this.convertJsonToPostParams(user).toString(), this.getHeaders())
  }
}
