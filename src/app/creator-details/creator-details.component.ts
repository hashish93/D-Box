import { Component, OnInit } from '@angular/core';
import {Creator} from "../models/creator.model";
import {CreatorService} from "../services/creator.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AppSettings} from "../app.settings";
import {VideoService} from "../services/video.service";
import {Video} from "../models/video.model";

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
    , public router : Router, public videoService : VideoService) { }
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
      console.log(data);
      this.loading = false;
      this.error = '';
      this.creator = data;
    },err=>{
      this.loading = false;
      this.error = JSON.stringify(err.error);
    })
  }

  private getLatestVideos(id: Number) {
    this.loadingLatestVideos = true;
    this.videoService.getVideos(12,'views','desc',{creator_id:this.creator._id}).subscribe(data=> {
      console.log(data);
      this.loadingLatestVideos = false;
      this.errorLatestVideos = '';
      this.latestVideos = data;
    },err=>{
      this.loadingLatestVideos = false;
      this.errorLatestVideos = JSON.stringify(err.error);
    })
  }
}
