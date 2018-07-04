import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  readonly apiKey: string = 'playlist';
  constructor(private http: HttpClient) { }

  public getPlaylistFromTypeLimited(type:string,limit:Number): Observable<any>{
    return this.http.get("playlists/"+type+'?limit='+limit)
  }
}
