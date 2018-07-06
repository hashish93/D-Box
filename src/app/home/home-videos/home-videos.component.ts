import { Component, OnInit } from '@angular/core';
import { TabDirective } from 'ngx-bootstrap/tabs';
import {PlaylistService} from "../../services/playlist.service";
import {AppSettings} from "../../app.settings";
import {Video} from "../../models/video.model";

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

  constructor(public playlistService : PlaylistService) { }

  ngOnInit() {
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

}
