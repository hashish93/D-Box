import { Component, OnInit } from '@angular/core';
import {VideoService} from "../../services/video.service";
import {AppSettings} from "../../app.settings";
import {Video} from "../../models/video.model";

@Component({
  selector: 'app-favorites',
  templateUrl: 'favorites.component.html',
  styleUrls: ['favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  public current_page: number = 1;
  public limit : number = 6;
  public loading : boolean = false;
  public error : string = '';
  public data : Video[] = [];
  public total : Number = 0 ;
  private staticEndPoint : string = '';
  constructor(public videoService : VideoService) { }

  ngOnInit() {
    this.staticEndPoint = AppSettings.getStaticEndpoint();
    this.getLikedVideos()
  }

  public pageChanged(event){
    this.current_page = event;
    this.getLikedVideos();
  }

  public getLikedVideos() {
    this.loading = true;
    this.videoService.getLikedVideos(this.current_page , this.limit , 2).subscribe(data=>{
      this.data = data.data;
      this.total = data.total;
      this.loading = false;
      this.error = '';
    },err=>{
      this.error = JSON.stringify(err.error);
      this.loading = false;
    })
  }

  public unlikeVideo(video){
    video.counters.likes-=1;
    this.videoService.likeVideo(video.id).subscribe(data=>{
      this.getLikedVideos();
    });
  }

}
