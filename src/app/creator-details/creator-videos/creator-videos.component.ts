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
  public current_page : number = 1;
  public next : string = '';
  public limit : number = 6;
  @Input()
  public creatorId: Number;
  constructor(public videoService : VideoService) { }

  ngOnInit() {
    this.staticEndPoint = AppSettings.getStaticEndpoint();
    this.getlatestVideos();
  }

  public getlatestVideos(more?){
    if(more){
      this.current_page +=1;
    }
    this.loading = true;
    this.error = '';
    // this.videos = [];
    this.videoService.getVideos(this.limit,null,null,{creator_id:this.creatorId},this.current_page,2).subscribe(data=> {
      if(more){
        this.videos.push.apply(this.videos, data.data);
      }else{
        this.videos = data.data;
      }

      this.next = data.next_page_url;
      this.loading = false;
      this.error = '';
    },error=>{
      this.loading = false;
      this.error = 'خطأ في تحميل القائمة الخاصة بفيديوهات المبدع'
    })
  }



}
