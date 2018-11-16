import { Component, OnInit } from '@angular/core';
import { TabDirective } from 'ngx-bootstrap/tabs';
import {PlaylistService} from "../../services/playlist.service";
import {AppSettings} from "../../app.settings";
import {Video} from "../../models/video.model";
import {AuthService} from '../../services/auth-service.service';
import {CreatorService} from '../../services/creator.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {VideoService} from '../../services/video.service';

@Component({
  selector: 'app-home-videos',
  templateUrl: 'home-videos.component.html',
  styleUrls: ['home-videos.component.scss']
})
export class HomeVideosComponent implements OnInit {
  public staticEndPoint: string = "";
  public loading : boolean = false;
  public error : string = '';
  public videos : Video[];
  activeTab: string;
  public AppSettings;
  constructor(public playlistService: PlaylistService ,
              public authService: AuthService,
              public creatorService: CreatorService ,
              public router: Router ,
              public userService: UserService,
              public videoService: VideoService) { }

  ngOnInit() {
    this.AppSettings = AppSettings;
    this.staticEndPoint = AppSettings.getStaticEndpoint();
    this.activeTab = 'watchnow';
    this.getPlaylistFromTypeLimited(this.activeTab);
  }

  onSelect(data: TabDirective): void {
    this.activeTab = data.id;
    this.getPlaylistFromTypeLimited(this.activeTab);
  }

  public getPlaylistFromTypeLimited(type:string){
    this.loading = true;
    this.error = '';
    this.videos = [];
    this.playlistService.getPlaylistFromTypeLimited(type,6).subscribe(data=> {
      this.videos = data;
      this.loading = false;
      this.error = '';
    },error=>{
      this.loading = false;
      this.error = 'خطأ في تحميل القائمة الخاصة ب'+type
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
