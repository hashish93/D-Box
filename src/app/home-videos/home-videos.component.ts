import { Component, OnInit } from '@angular/core';
import { TabDirective } from 'ngx-bootstrap/tabs';
import {PlaylistService} from "../services/playlist.service";
import {PlayList} from "../models/playlist.model";
import {AppSettings} from "../app.settings";

@Component({
  selector: 'app-home-videos',
  templateUrl: './home-videos.component.html',
  styleUrls: ['./home-videos.component.scss']
})
export class HomeVideosComponent implements OnInit {
  public staticEndPoint: string = "";
  public loading : boolean = false;
  public error : string = '';
  public playlist : PlayList;
  activeTab: string;

  constructor(public playlistService : PlaylistService) { }

  ngOnInit() {
    this.staticEndPoint = AppSettings.getStaticEndpoint();
    this.activeTab = 'watchnow';
    this.getPlaylistFromTypeLimited(this.activeTab);
  }

  onSelect(data: TabDirective): void {
    console.log(data)
    this.activeTab = data.id;
    this.getPlaylistFromTypeLimited(this.activeTab);
  }

  public getPlaylistFromTypeLimited(type:string){
    this.loading = true;
    this.error = '';
    this.playlist = null;
    this.playlistService.getPlaylistFromTypeLimited(type,6).subscribe(data=> {
      this.playlist = data;
      this.loading = false;
      this.error = '';
    },error=>{
      this.loading = false;
      this.error = 'خطأ في تحميل القائمة الخاصة ب'+type
    })
  }

}
