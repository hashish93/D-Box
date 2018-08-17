import { Component, OnInit } from '@angular/core';
import {Video} from "../../models/video.model";
import {VideoService} from "../../services/video.service";
import {AppSettings} from "../../app.settings";
import {Observable} from "rxjs";
import {NotExpr} from "@angular/compiler";
import {NotificationsService} from "angular2-notifications";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-videos',
  templateUrl: './my-videos.component.html',
  styleUrls: ['./my-videos.component.scss']
})
export class MyVideosComponent implements OnInit {
  public loading : boolean = false;
  public error : string = '';
  public videos : Video[] = [];
  public total: number = 0;
  public current_page : number = 1;
  public limit : number = 10;
  public staticEndPoint : string = '';
  public checked:boolean = false;
  constructor(public videoService : VideoService,public notificationService : NotificationsService , public router : Router) { }

  ngOnInit() {
    this.staticEndPoint = AppSettings.getStaticEndpoint();
    this.getMyVideos()
  }

  public pageChanged(event){
    this.current_page = event;
    this.getMyVideos();
  }

  public getMyVideos() {
    this.loading = true;
    this.videoService.getMyVideos(this.current_page , this.limit , 2).subscribe(data=>{
      this.videos = data.data;
      this.total = data.total;
      this.loading = false;
      this.error = '';
    },err =>{
      this.loading = false;
      this.error = JSON.stringify(err.error);
    })
  }

  public openLink(video : Video){
    if(video.published == 1 && video.activated == 1){
      console.log(video)
      this.router.navigate(['video/'+ video.id]);
    }
  }




  public deleteVideo(id){
    this.videoService.deleteVideo(id).subscribe(data=>{
      this.notificationService.success("تم حذف الفيديو بنجاح","",{timeOut:3000})
      this.getMyVideos()
    },err=>{
      this.notificationService.error("خطأ في حذف الفيديو","",{timeOut:3000})
    })

  }

  public toggleCheck(){
    this.checked = !this.checked;
    for(let video of this.videos){
        video.checked = this.checked;
    }
  }
  public deleteMultiple(){
    let  IDS = [];
    for(let video of this.videos){
      if(video.checked)
        IDS.push(video.id);
    }
    if(IDS.length > 0){
      this.videoService.deleteVideos(IDS).subscribe(data=>{
        this.notificationService.success("تم حذف الفيديوهات بنجاح","",{timeOut:3000})
        this.getMyVideos()
      },err=>{
        this.notificationService.error("خطأ في حذف الفيديوهات","",{timeOut:3000})
      })
    }
  }

}
