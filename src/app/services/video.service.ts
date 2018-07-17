import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  readonly apiKey: string = 'videos';
  constructor(public  http: HttpClient) { }

  public getVideos(limit?:Number,order?:String,orderBy?:string,filter?:Object): Observable<any>{
    let params : string = '';
    if(limit){
      params +='?limit='+limit
    }
    if(order){
      params +='&order='+order
    }
    if(orderBy){
      params +='&orderBy='+orderBy
    }
    if(filter){
      if(params){
        params +="&"+Object.keys(filter)[0]+'='+filter[Object.keys(filter)[0]]
      }else{
        params +="?"+Object.keys(filter)[0]+'='+filter[Object.keys(filter)[0]]
      }

    }
    return this.http.get(this.apiKey+params)
  }

  public getVideo(id?:Number): Observable<any>{
    return this.http.get(this.apiKey+'/'+id);
  }

  public likeVideo(id: Number): Observable<any> {
    return this.http.get('auth/like/'+id);
  }

  public isVideoLiked(id: Number): Observable<any> {
    return this.http.get('auth/isliked/'+id);
  }

  public getLikedVideos(page?:Number,limit?:Number,pagination?:Number): Observable<any>{
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
  return this.http.get('auth/liked/list'+params);
}
}
