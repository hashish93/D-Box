import { Component, OnInit } from '@angular/core';
import {Category} from "../models/category.model";
import {AppSettings} from "../app.settings";
import {CategoryService} from "../services/category.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {VideoService} from "../services/video.service";
import {Video} from "../models/video.model";

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {
  public loading : boolean = true;
  public error : string;
  public category: Category = {} as Category;
  public videos : Video[] = [];
  public firstVideo : Video;
  public staticEndPoint;

  constructor(public categoryService : CategoryService,public route : ActivatedRoute
    , public router : Router,public videoService : VideoService) { }

  ngOnInit() {
    this.route.params.forEach(params => {;
      this.getCategoryDetails(params["id"]);
      //call your function, like getUserInfo()
    });
    this.staticEndPoint = AppSettings.getStaticEndpoint();
  }

  getCategoryDetails(id) {
    this.category.id = parseInt(id);
    this.getCategory(this.category.id);
    this.getCategoryVideos(this.category.id);
  }

  public getCategory(id : Number){
    this.loading = true;
    this.categoryService.getCategory(id).subscribe(data=> {
      console.log(data);
      this.loading = false;
      this.category = data;
    },err=>{
      this.loading = false;
      this.error = JSON.stringify(err.error);
    })
  }

  private getCategoryVideos(id: Number) {
    this.loading = true;
    this.firstVideo = null;
    this.videoService.getVideos(null,null,null,{category_id:id}).subscribe(data=> {
      console.log(data);
      this.loading = false;
      this.videos = data;
      if(this.videos && this.videos.length > 0){
        this.firstVideo =  this.videos[0];
        this.videos = this.videos.splice(1);
        console.log(this.videos)
      }

    },err=>{
      this.loading = false;
      this.error = JSON.stringify(err.error);
    })
  }
}
