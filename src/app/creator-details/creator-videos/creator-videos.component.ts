import {Component, OnInit, Input} from '@angular/core';
import {Video} from "../../models/video.model";
import {VideoService} from "../../services/video.service";
import {AppSettings} from "../../app.settings";
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth-service.service';
import {CreatorService} from '../../services/creator.service';
import {Router} from '@angular/router';

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
  constructor(public videoService : VideoService , public userService : UserService
    , public authService : AuthService , public creatorService : CreatorService , public router : Router) { }

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
