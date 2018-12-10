import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Video} from "../models/video.model";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  readonly apiKey: string = 'playlist';
  constructor(public  http: HttpClient) { }

  public getPlaylistFromTypeLimited(type:string,limit:Number): Observable<any>{
    if(type=='watchnow'){
      return this.http.get('collections?limit='+limit+'&orderBy=desc');
    }else if(type=='trend'){
      return this.http.get('collections?limit='+limit+'&order=views&orderBy=desc');
    }else
      return this.http.get("collections?limit="+limit)
  }
}
