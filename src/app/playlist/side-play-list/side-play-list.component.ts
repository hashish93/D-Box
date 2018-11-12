import { Component, OnInit } from '@angular/core';
import {Video} from '../../models/video.model';
import {VideoService} from '../../services/video.service';
import {AppSettings} from '../../app.settings';

@Component({
  selector: 'app-side-play-list',
  templateUrl: './side-play-list.component.html',
  styleUrls: ['./side-play-list.component.scss']
})
export class SidePlayListComponent implements OnInit {
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
    this.videoService.getVideos(5,'views','desc',null).subscribe(data=> {
      this.videos = data;
      this.loading = false;
      this.error = '';
    },error=>{
      this.loading = false;
      this.error = 'خطأ في تحميل القائمة الخاصة الأكثر مشاهدة'
    })
  }
}
