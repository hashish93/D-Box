import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth-service.service";
import {Router, ActivatedRoute} from "@angular/router";
import {Video} from "../models/video.model";
import {VideoService} from "../services/video.service";
import {AppSettings} from "../app.settings";
import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.scss'],

})
export class VideoDetailsComponent implements OnInit {
  public video : Video = {} as Video;
  public loading : boolean = true;
  public videoEndPoint;
  url: SafeResourceUrl;
  public isLiked = false;
  public error : String= '';
  constructor(public authService : AuthService , public router : Router,
              private route: ActivatedRoute,public videoService : VideoService,public sanitizer:DomSanitizer) { }

  ngOnInit() {
    this.videoEndPoint = AppSettings.getVideoEndpoint();
    this.video.id =  parseInt(this.route.snapshot.paramMap.get('id'));
    if(this.video.id){
      this.getVideo(this.video.id);
      this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoEndPoint+''+this.video.id.toString());
    }else{
      this.router.navigate(['']);
    }
  }

  public getVideo(id : Number){
    this.loading = true;
    this.error = '';
    this.videoService.getVideo(this.video.id).subscribe(data=> {
      console.log(data);
      this.video = data;
      this.loading = false;
      this.isVideoLiked(this.video._id);
    },err=>{
      this.loading = false;
      this.error = JSON.stringify(err.error);
    });
  }

  public isVideoLiked(id : Number){
    if(this.authService.isAuthenticated()){
      this.videoService.isVideoLiked(id).subscribe(data=> {
        this.isLiked = data.message;
        console.log(this.isLiked);
      })
    }
  }
  public likeVideo(){
    if(this.authService.isAuthenticated()){
      this.isLiked = !this.isLiked;
      this.videoService.likeVideo(this.video._id).subscribe(data=>{
        console.log(this.isLiked)
      })
    }else {
      this.router.navigate(['login'])
    }

  }
}
