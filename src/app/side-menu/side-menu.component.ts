import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../services/category.service";
import {Category} from "../models/category.model"
import {AppSettings} from "../app.settings";
import {AuthService} from "../services/auth-service.service";
@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  public staticEndPoint: string = "";
  public loading : boolean = false;
  public error : string = '';
  public categories : Category[] = []

  constructor(public categoryService : CategoryService , public authService : AuthService) { }

  ngOnInit() {
    this.staticEndPoint = AppSettings.getStaticEndpoint()
    this.getCategories();
  }

  private getCategories() {
    this.loading = true;
    this.categoryService.getCategories().subscribe(data=> {
      this.categories = data;
      this.loading = false;
    },error=>{
      this.loading = false;
      this.error = 'خطأ في تحميل القائمة'
    })
  }

}
