import { Observable } from "rxjs"
import { Injectable } from '@angular/core';
import { HttpClient , HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  readonly apiKey: string = 'category';
  constructor(public  http: HttpClient) { }

  public getCategories(): Observable<any>{
    return this.http.get("categories")
  }

  getCategory(id: Number): Observable<any>  {
    return this.http.get("categories"+"/"+id);
  }
}
