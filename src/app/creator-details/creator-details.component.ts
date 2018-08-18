import { Component, OnInit } from '@angular/core';
import {Creator} from "../models/creator.model";
import {CreatorService} from "../services/creator.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AppSettings} from "../app.settings";
import {VideoService} from "../services/video.service";
import {Video} from "../models/video.model";
import {AuthService} from "../services/auth-service.service";
import {UserService} from "../services/user.service";
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-creator-details',
  templateUrl: './creator-details.component.html',
  styleUrls: ['./creator-details.component.scss']
})
export class CreatorDetailsComponent implements OnInit {
  public loading : boolean = true;
  public loadingLatestVideos : boolean = true;
  public error : string;
  public errorLatestVideos : string;
  public creator : Creator = {} as Creator;
  public latestVideos : Video[] = [] ;
  public staticEndPoint;

  constructor(public creatorService : CreatorService,public route : ActivatedRoute
    , public router : Router, public videoService : VideoService,public authService : AuthService,public userService : UserService,public titleService : Title){
    this.titleService.setTitle('المبدع');
  }
  ngOnInit() {
    this.route.params.forEach(params => {
      this.getCreatorDetails(params["id"]);
    });
    this.staticEndPoint = AppSettings.getStaticEndpoint();
  }

  getCreatorDetails(id) {
    this.creator._id = parseInt(id);
    this.getCreator(this.creator._id);
    this.getLatestVideos(this.creator._id)
  }

  public getCreator(id : Number){
    this.loading = true;
    this.creatorService.getCreator(id).subscribe(data=> {
      this.loading = false;
      this.error = '';
      this.creator = data;
    },err=>{
      this.loading = false;
      this.error = JSON.stringify(err.error);
    })
  }

  public follow_creator() {
    this.userService.getUserData().subscribe(data=> {
      let user = data;
      if (user.id != this.creator._id) {
        if (this.authService.isAuthenticated()) {
          this.creator.is_followed = !this.creator.is_followed;
          this.creator.is_followed ? this.creator.counter.likes += 1 : this.creator.counter.likes -= 1;
          this.creatorService.followCreator(this.creator._id).subscribe(data=> {
          })
        } else {
          this.router.navigate(['login'])
        }
      }
    });
  }

  private getLatestVideos(id: Number) {
    this.loadingLatestVideos = true;
    this.videoService.getVideos(12,'views','desc',{creator_id:this.creator._id}).subscribe(data=> {
      this.loadingLatestVideos = false;
      this.errorLatestVideos = '';
      this.latestVideos = data;
    },err=>{
      this.loadingLatestVideos = false;
      this.errorLatestVideos = JSON.stringify(err.error);
    })
  }
}
