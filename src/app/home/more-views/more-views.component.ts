import { Component, OnInit } from '@angular/core';
import {Video} from "../../models/video.model";
import {VideoService} from "../../services/video.service";
import {AppSettings} from "../../app.settings";
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth-service.service';
import {CreatorService} from '../../services/creator.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-more-views',
  templateUrl: './more-views.component.html',
  styleUrls: ['./more-views.component.scss']
})
export class MoreViewsComponent implements OnInit {
  public staticEndPoint: string = "";
  public loading : boolean = false;
  public error : string = '';
  public videos : Video[];
  public AppSettings:any;
  constructor(public videoService : VideoService , public userService : UserService
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
    this.videoService.getVideos(4,'views','desc').subscribe(data=> {
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

}
