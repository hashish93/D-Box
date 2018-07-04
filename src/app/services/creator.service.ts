import { Observable } from "rxjs"
import { Injectable } from '@angular/core';
import { HttpClient , HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CreatorService {
  readonly apiKey: string = 'creator';
  constructor(private http: HttpClient) { }

  public getCreators(): Observable<any>{
    return this.http.get("creators")
  }
}
