import { Observable } from "rxjs"
import { Injectable } from '@angular/core';
import { HttpClient , HttpResponse } from '@angular/common/http';

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
}
