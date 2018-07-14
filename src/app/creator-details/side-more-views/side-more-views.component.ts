import { Component, OnInit } from '@angular/core';
import {VideoService} from "../../services/video.service";
import {AppSettings} from "../../app.settings";
import {Video} from "../../models/video.model";

@Component({
  selector: 'app-side-more-views',
  templateUrl: './side-more-views.component.html',
  styleUrls: ['./side-more-views.component.scss']
})
export class SideMoreViewsComponent implements OnInit {
  public staticEndPoint: string = "";
  public loading : boolean = false;
  public error : string = '';
  public videos : Video[];
  constructor(public videoService : VideoService) { }

  ngOnInit() {
    this.staticEndPoint = AppSettings.getStaticEndpoint();
    this.getMoreViews();
  }

  public getMoreViews(){
    this.loading = true;
    this.error = '';
    this.videos = [];
    this.videoService.getVideos(5,'view','desc',null).subscribe(data=> {
      this.videos = data;
      this.loading = false;
      this.error = '';
    },error=>{
      this.loading = false;
      this.error = 'خطأ في تحميل القائمة الخاصة الاكثر مشاهدة'
    })
  }
}
