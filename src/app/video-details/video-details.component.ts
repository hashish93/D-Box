import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth-service.service";
import {Router, ActivatedRoute} from "@angular/router";
import {Video} from "../models/video.model";
import {VideoService} from "../services/video.service";
import {AppSettings} from "../app.settings";
import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';
import {Creator} from "../models/creator.model";

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.scss'],

})
export class VideoDetailsComponent implements OnInit {
  public video : Video = {} as Video;
  public creator : Creator = {} as Creator;
  public loading : boolean = true;
  public videoEndPoint;
  public staticEndPoint;
  url: SafeResourceUrl;
  public isLiked = false;
  public error : String= '';
  constructor(public authService : AuthService , public router : Router,
              public  route: ActivatedRoute,public videoService : VideoService,public sanitizer:DomSanitizer) { }

  ngOnInit() {
    this.videoEndPoint = AppSettings.getVideoEndpoint();
    this.staticEndPoint = AppSettings.getStaticEndpoint();

    this.route.params.forEach(params => {
      this.video.id =  parseInt(params["id"]);
      if(this.video.id){
        this.getVideo(this.video.id);
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoEndPoint+''+this.video.id.toString());
      }else{
        this.router.navigate(['']);
      }
    });

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
      })
    }
  }
  public likeVideo(){
    if(this.authService.isAuthenticated()){
      this.isLiked = !this.isLiked;
      this.videoService.likeVideo(this.video._id).subscribe(data=>{
      })
    }else {
      this.router.navigate(['login'])
    }

  }

  public getCreator(creator : any){
    console.log('creator: ', creator);
    this.creator = creator;
  }
}
