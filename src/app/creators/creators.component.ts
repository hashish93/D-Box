import { Component, OnInit } from '@angular/core';
import {AppSettings} from '../app.settings';
import {CreatorService} from '../services/creator.service';
import {Creator} from '../models/creator.model';
import {VideoService} from '../services/video.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-creators',
  templateUrl: './creators.component.html',
  styleUrls: ['./creators.component.scss']
})
export class CreatorsComponent implements OnInit {
  public loading : boolean = true;
  public error : string = '';
  public limit : number = 40;
  public data : Creator[] = [];
  public total : Number = 0 ;
  public current_page: number = 1;
  private staticEndPoint : string = '';

  constructor(public creatorService : CreatorService,public titleService : Title){
    this.titleService.setTitle('المبدعون');
  }

  ngOnInit() {
    this.staticEndPoint = AppSettings.getStaticEndpoint();
    this.getCreators();
  }



  public getCreators(){
    this.loading = true;
    this.creatorService.getCreators(this.limit,this.current_page,2).subscribe(data=>{
      this.loading = false;
      this.data = data.data;
      this.total = data.total;
      this.error = '';
    },err=>{
      this.error = JSON.stringify(err.error);
      this.loading = false;
    })
  }

  public pageChanged(event){
    this.current_page = event;
    this.getCreators();
  }
}
