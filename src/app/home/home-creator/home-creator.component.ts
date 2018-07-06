import { Component, OnInit } from '@angular/core';
import {Creator} from "../../models/creator.model";
import {CreatorService} from "../../services/creator.service";
import {AppSettings} from "../../app.settings";

@Component({
  selector: 'app-home-creator',
  templateUrl: 'home-creator.component.html',
  styleUrls: ['home-creator.component.scss']
})
export class HomeCreatorComponent implements OnInit {
  public staticEndPoint: string = "";
  public loading : boolean = false;
  public error : string = '';
  public creators : Creator[];
  constructor(public creatorService : CreatorService) { }

  ngOnInit() {
    this.staticEndPoint = AppSettings.getStaticEndpoint();
    this.getCreatorLimited()
  }

  public getCreatorLimited(){
    this.loading = true;
    this.error = '';
    this.creators = [];
    this.creatorService.getCreators(4).subscribe(data=> {
      this.creators = data;
      this.loading = false;
      this.error = '';
    },error=>{
      this.loading = false;
      this.error = 'خطأ في تحميل القائمة الخاصة بالمبدعون'
    })
  }

}
