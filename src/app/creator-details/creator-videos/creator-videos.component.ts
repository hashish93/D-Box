import {Component, OnInit, Input} from '@angular/core';
import {Video} from "../../models/video.model";
import {VideoService} from "../../services/video.service";
import {AppSettings} from "../../app.settings";

@Component({
  selector: 'app-creator-videos',
  templateUrl: './creator-videos.component.html',
  styleUrls: ['./creator-videos.component.scss']
})
export class CreatorVideosComponent implements OnInit {
  public staticEndPoint: string = "";
  public loading : boolean = false;
  public error : string = '';
  public videos : Video[];
  @Input()
  public creatorId: Number;
  constructor(public videoService : VideoService) { }

  ngOnInit() {
    this.staticEndPoint = AppSettings.getStaticEndpoint();
    this.getlatestVideos();
  }

  public getlatestVideos(){
    this.loading = true;
    this.error = '';
    this.videos = [];
    this.videoService.getVideos(6,null,null,{creator_id:this.creatorId}).subscribe(data=> {
      this.videos = data;
      this.loading = false;
      this.error = '';
    },error=>{
      this.loading = false;
      this.error = 'خطأ في تحميل القائمة الخاصة بفيديوهات المبدع'
    })
  }

}
