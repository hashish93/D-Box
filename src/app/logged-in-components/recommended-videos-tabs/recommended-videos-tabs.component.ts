import { Component, OnInit } from '@angular/core';
import {Video} from '../../models/video.model';
import {VideoService} from '../../services/video.service';
import {AppSettings} from '../../app.settings';
import {PlaylistService} from '../../services/playlist.service';

@Component({
  selector: 'app-recommended-videos-tabs',
  templateUrl: './recommended-videos-tabs.component.html',
  styleUrls: ['./recommended-videos-tabs.component.scss']
})
export class RecommendedVideosTabsComponent implements OnInit {

  public staticEndPoint: string = "";
  public loading : boolean = false;
  public error : string = '';
  public videos : Video[];
  constructor(public playListService : PlaylistService) { }

  ngOnInit() {
    this.staticEndPoint = AppSettings.getStaticEndpoint();
    this.getlatestVideos();
  }

  public getlatestVideos(){
    this.loading = true;
    this.error = '';
    this.videos = [];
    this.playListService.getPlaylistFromTypeLimited('recommended',3).subscribe(data=> {
      this.videos = data;
      this.loading = false;
      this.error = '';
    },error=>{
      this.loading = false;
      this.error = 'خطأ في تحميل القائمة الخاصة بالاكثر مشاهدة'
    })
  }

}
