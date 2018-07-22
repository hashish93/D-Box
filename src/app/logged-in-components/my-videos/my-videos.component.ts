import { Component, OnInit } from '@angular/core';
import {Video} from "../../models/video.model";
import {VideoService} from "../../services/video.service";
import {AppSettings} from "../../app.settings";

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
  constructor(public videoService : VideoService) { }

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
}
