import { Component, OnInit } from '@angular/core';
import {Video} from '../models/video.model';
import {Creator} from '../models/creator.model';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {AuthService} from '../services/auth-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {VideoService} from '../services/video.service';
import {AppSettings} from '../app.settings';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  public video : Video = {} as Video;
  public creator : Creator = {} as Creator;
  public loading : boolean = true;
  public share : boolean = false;
  public slide : boolean = false;
  public videoEndPoint;
  public staticEndPoint;
  url: SafeResourceUrl;
  public error : String= '';
  constructor(public authService : AuthService , public router : Router,
              public  route: ActivatedRoute,public videoService : VideoService,public sanitizer:DomSanitizer) { }

  ngOnInit() {
    this.videoEndPoint = AppSettings.getVideoEndpoint();
    this.staticEndPoint = AppSettings.getStaticEndpoint();

    this.route.queryParams.forEach(params => {
      this.video.id =  parseInt(params["video"]);
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
    this.videoService.getVideo(id).subscribe(data=> {
      this.video = data;
      this.loading = false;
    },err=>{
      this.loading = false;
      this.error = JSON.stringify(err.error);
    });
  }


  public likeVideo(){
    if(this.authService.isAuthenticated()){
      this.video.is_liked = !this.video.is_liked;
      this.video.is_liked ? this.video.counter.likes+=1 : this.video.counter.likes-=1;
      this.videoService.likeVideo(this.video._id).subscribe(data=>{
      })
    }else {
      this.router.navigate(['login'])
    }

  }

  public getCreator(creator : any){
    this.creator = creator;
  }
}
