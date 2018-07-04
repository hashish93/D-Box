import { Observable } from "rxjs"
import { Injectable } from '@angular/core';
import { HttpClient , HttpResponse } from '@angular/common/http';

import { Category} from '../models/category.model'
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  readonly apiKey: string = 'category';
  constructor(private http: HttpClient) { }

  public getCategories(): Observable<any>{
    return this.http.get("categories")
  }
}
