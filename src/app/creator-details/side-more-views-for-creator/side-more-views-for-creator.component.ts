import {Component, Input, OnInit} from '@angular/core';
import {Video} from '../../models/video.model';
import {VideoService} from '../../services/video.service';
import {AppSettings} from '../../app.settings';
import {CreatorService} from '../../services/creator.service';

@Component({
  selector: 'app-side-more-views-for-creator',
  templateUrl: './side-more-views-for-creator.component.html',
  styleUrls: ['./side-more-views-for-creator.component.scss']
})
export class SideMoreViewsForCreatorComponent implements OnInit {
  public staticEndPoint: string = "";
  public loading : boolean = false;
  public error : string = '';
  public videos : Video[];
  @Input()
  public creator_id : number;
  public creator_name : string = '';
  constructor(public videoService : VideoService , public creatorService : CreatorService) { }

  ngOnInit() {
    this.staticEndPoint = AppSettings.getStaticEndpoint();
    this.getMoreViews();
    this.getCreator();
  }

  public getMoreViews(){
    this.loading = true;
    this.error = '';
    this.videos = [];
    this.videoService.getVideos(7,'views','desc',{creator_id:this.creator_id}).subscribe(data=> {
      this.videos = data;
      this.loading = false;
      this.error = '';
    },error=>{
      this.loading = false;
      this.error = 'خطأ في تحميل القائمة الخاصة الاكثر مشاهدة'
    })
  }

  public getCreator(){
    this.creatorService.getCreator(this.creator_id).subscribe(data=>{
      this.creator_name = data.title;
    });
  }

}
