import { Component, OnInit } from '@angular/core';
import { TabDirective } from 'ngx-bootstrap/tabs';
import {PlaylistService} from "../../services/playlist.service";
import {AppSettings} from "../../app.settings";
import {Video} from "../../models/video.model";
import {AuthService} from '../../services/auth-service.service';
import {CreatorService} from '../../services/creator.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';

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
              public userService: UserService) { }

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

}
