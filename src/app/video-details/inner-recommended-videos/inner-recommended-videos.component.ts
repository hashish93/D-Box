import {Component, OnInit, Input} from '@angular/core';
import {AppSettings} from "../../app.settings";
import {Video} from "../../models/video.model";
import {PlaylistService} from "../../services/playlist.service";
import {VideoService} from '../../services/video.service';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth-service.service';
import {CreatorService} from '../../services/creator.service';
import {Router} from '@angular/router';

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
  public AppSettings: any;

  constructor(public playListService : PlaylistService,public videoService : VideoService , public userService : UserService
    , public authService : AuthService , public creatorService : CreatorService , public router : Router) { }

  ngOnInit() {
    this.AppSettings = AppSettings;
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

  public addToWatchLater(video){
    if (this.authService.isAuthenticated()) {
      video.is_watched = !video.is_watched;
      var id = video._id ? video._id : video.id;
      this.videoService.addToWatchLater(id).subscribe(data => {
      })
    } else {
      this.router.navigate(['login']);
    }
  }

}
