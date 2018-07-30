import {Component, OnInit, Input} from '@angular/core';
import {AppSettings} from "../../app.settings";
import {Video} from "../../models/video.model";
import {PlaylistService} from "../../services/playlist.service";

@Component({
  selector: 'app-inner-recommended-videos',
  templateUrl: './inner-recommended-videos.component.html',
  styleUrls: ['./inner-recommended-videos.component.scss']
})
export class InnerRecommendedVideosComponent implements OnInit {
  public staticEndPoint: string = "";
  public loading : boolean = false;
  public error : string = '';
  public videos : Video[];
  @Input()
  public creatorId: Number;
  constructor(public playListService : PlaylistService) { }

  ngOnInit() {
    this.staticEndPoint = AppSettings.getStaticEndpoint();
    this.getlatestVideos();
  }

  public getlatestVideos(){
    this.loading = true;
    this.error = '';
    this.videos = [];
    this.playListService.getPlaylistFromTypeLimited('recommended',6).subscribe(data=> {
      this.videos = data;
      this.loading = false;
      this.error = '';
    },error=>{
      this.loading = false;
      this.error = 'خطأ في تحميل القائمة الخاصة بالفيديوهات المقترحة'
    })
  }

}
