import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FollowerService {

  readonly apiListKey: string = 'auth/followed/list';
  readonly apiFollowKey: string = 'auth/follow';
  constructor(public  http: HttpClient) { }

  public getFollowers(page?:Number,limit?:Number,pagination?:Number): Observable<any>{
    let params : string = '';
    if(page){
      params +='?page='+page
    }
    if(limit){
      params +='&limit='+limit
    }
    if(pagination){
      params +='&pagination='+pagination
    }
    return this.http.get(this.apiListKey+params);
  }

  public unfollow(id:Number): Observable<any>{
    return this.http.get(this.apiFollowKey+'/'+id);
  }
}
