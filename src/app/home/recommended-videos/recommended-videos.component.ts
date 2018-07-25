import { Component, OnInit } from '@angular/core';
import {VideoService} from "../../services/video.service";
import {Video} from "../../models/video.model";
import {AppSettings} from "../../app.settings";
import {PlaylistService} from "../../services/playlist.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-recommended-videos',
  templateUrl: './recommended-videos.component.html',
  styleUrls: ['./recommended-videos.component.scss']
})
export class RecommendedVideosComponent implements OnInit {
  public staticEndPoint: string = "";
  public loading : boolean = false;
  public error : string = '';
  public videos : Video[];
  constructor(public videoService : VideoService , public playListService :PlaylistService,public router :Router) { }

  ngOnInit() {
    this.staticEndPoint = AppSettings.getStaticEndpoint();
    this.getlatestVideos();
  }

  public getlatestVideos(){
    this.loading = true;
    this.error = '';
    this.videos = [];
    this.playListService.getPlaylistFromTypeLimited('recommended',5).subscribe(data=> {
      this.videos = data;
      this.loading = false;
      this.error = '';
    },error=>{
      this.loading = false;
      this.error = 'خطأ في تحميل القائمة الخاصة بالاكثر مشاهدة'
    })
  }

}
