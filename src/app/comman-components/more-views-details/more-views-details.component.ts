import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Video} from "../../models/video.model";
import {VideoService} from "../../services/video.service";
import {AppSettings} from "../../app.settings";

@Component({
  selector: 'app-more-views-details',
  templateUrl: './more-views-details.component.html',
  styleUrls: ['./more-views-details.component.scss'],
})
export class MoreViewsDetailsComponent implements OnInit , OnChanges  {
  ngOnChanges(changes: any  ): void {
      if(changes && changes.categoryId && changes.categoryId.previousValue) {
        console.log(changes.categoryId.previousValue); //SimpleChange {previousValue: 43, currentValue: 44}
        this.categoryId = changes.categoryId.previousValue
        this.getVideos();
      }
  }

  public staticEndPoint: string = "";
  public loading : boolean = false;
  public error : string = '';
  public videos : Video[];
  @Input()
  public categoryId : Number;
  @Input()
  public limit : Number = 4;
  constructor(public videoService : VideoService) { }

  ngOnInit() {
    this.staticEndPoint = AppSettings.getStaticEndpoint();
    this.getVideos();
  }

  public getVideos(){
    this.loading = true;
    this.error = '';
    this.videos = [];
    this.videoService.getVideos(this.limit,'views','desc',{category_id:this.categoryId}).subscribe(data=> {
      this.videos = data;
      this.loading = false;
      this.error = '';
    },error=>{
      this.loading = false;
      this.error = 'خطأ في تحميل القائمة الخاصة بالاكثر مشاهدة'
    })
  }
}
