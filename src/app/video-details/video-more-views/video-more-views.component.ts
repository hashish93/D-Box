import { Component, OnInit } from '@angular/core';
import {Video} from '../../models/video.model';
import {PlaylistService} from '../../services/playlist.service';
import {VideoService} from '../../services/video.service';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth-service.service';
import {CreatorService} from '../../services/creator.service';
import {Router} from '@angular/router';
import {AppSettings} from '../../app.settings';

@Component({
  selector: 'app-video-more-views',
  templateUrl: './video-more-views.component.html',
  styleUrls: ['./video-more-views.component.scss']
})
export class VideoMoreViewsComponent implements OnInit {

  public staticEndPoint: string = "";
  public loading : boolean = false;
  public error : string = '';
  public videos : Video[];

  constructor(public playListService : PlaylistService,public videoService : VideoService , public userService : UserService
    , public authService : AuthService , public creatorService : CreatorService , public router : Router) { }

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

}
