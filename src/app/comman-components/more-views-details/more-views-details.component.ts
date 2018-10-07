import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Video} from "../../models/video.model";
import {VideoService} from "../../services/video.service";
import {AppSettings} from "../../app.settings";
import {AuthService} from '../../services/auth-service.service';
import {CreatorService} from '../../services/creator.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-more-views-details',
  templateUrl: './more-views-details.component.html',
  styleUrls: ['./more-views-details.component.scss'],
})
export class MoreViewsDetailsComponent implements OnInit , OnChanges  {
  ngOnChanges(changes: any  ): void {
      if(changes && changes.categoryId && changes.categoryId.previousValue) {
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
  public AppSettings: any;
  constructor(public videoService : VideoService,
              public authService: AuthService,
              public creatorService: CreatorService ,
              public router: Router ,
              public userService: UserService) { }

  ngOnInit() {
    this.AppSettings = AppSettings;
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

  public followCreator(video) {
    this.userService.getUserData().subscribe(data => {
      let user = data;
      if (user.id != video.creator.id) {
        if (this.authService.isAuthenticated()) {
          video.creator.is_followed = !video.creator.is_followed;
          this.creatorService.followCreator(video.creator.id).subscribe(data => {
          })
        } else {
          this.router.navigate(['login']);
        }
      }
    },err=>{
      this.router.navigate(['login']);
    });
  }
  public likeVideo(video){
    let id = video.id || video._id;
    if(this.authService.isAuthenticated()){
      video.is_liked = !video.is_liked;
      video.is_liked ? video.counter.likes+=1 : video.counter.likes-=1;
      this.videoService.likeVideo(id).subscribe(data=>{
      })
    }else {
      this.router.navigate(['login'])
    }
  }
}
