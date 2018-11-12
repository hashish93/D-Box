import { Component, OnInit } from '@angular/core';
import {VideoService} from "../../services/video.service";
import {Video} from "../../models/video.model";
import {AppSettings} from "../../app.settings";
import {PlaylistService} from "../../services/playlist.service";
import {Router} from "@angular/router";
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth-service.service';
import {CreatorService} from '../../services/creator.service';

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
  public active : string='';
  private AppSettings: any;
  
  constructor(public videoService : VideoService , public playListService :PlaylistService,public router :Router,
              public userService : UserService, public authService : AuthService , public creatorService : CreatorService) { }

  ngOnInit() {
    this.AppSettings = AppSettings;
    this.staticEndPoint = AppSettings.getStaticEndpoint();
    this.getlatestVideos('recommended');
  }

  public getlatestVideos(type:string){
    this.active = type;
    this.loading = true;
    this.error = '';
    this.videos = [];
    this.playListService.getPlaylistFromTypeLimited(type,3).subscribe(data=> {
      this.videos = data;
      this.loading = false;
      this.error = '';
    },error=>{
      this.loading = false;
      this.error = 'خطأ في تحميل القائمة الخاصة بالأكثر مشاهدة'
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
