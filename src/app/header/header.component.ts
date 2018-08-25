import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {AuthService} from "../services/auth-service.service";
import {CreatorService} from "../services/creator.service";
import {Creator} from "../models/creator.model";
import {CategoryService} from '../services/category.service';
import {Category} from '../models/category.model';
import {AppSettings} from '../app.settings';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchIcon = faSearch;
  public user : Creator = {} as Creator;
  public categories : Category[] = [];
  public isCollapsed : boolean = true;
  public staticEndPoint: string;
  public search : string = '';
  constructor(public creatorService : CreatorService,public authService : AuthService , public categoryService : CategoryService , public router : Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    this.staticEndPoint = AppSettings.getStaticEndpoint()
    this.getUser();
    this.getCategories();
  }

  public getUser() {
    if(this.authService.isAuthenticated()){
      this.creatorService.getUser().subscribe(data=>{
        this.user = data;
      });
    }
  }
  public  getCategories() {
    this.categoryService.getCategories().subscribe(data=> {
      this.categories = data;
    });
  }

  public onFormSubmit(searchForm){
    console.log(this.search);
    if(this.search){
      this.router.navigate(['/results'],{queryParams:{'page':'search','key': this.search}})
    }
  }

  public logout(){
      // Client only code.
      if (isPlatformBrowser(this.platformId)) {
          this.authService.logout().subscribe(data=>{
              localStorage.clear();
          },error=>{
              localStorage.clear();
          });
      }

  }

}

