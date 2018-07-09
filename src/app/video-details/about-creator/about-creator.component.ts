import {Component, OnInit, Input} from '@angular/core';
import {CreatorService} from "../../services/creator.service";
import {Creator} from "../../models/creator.model";
import {AppSettings} from "../../app.settings";

@Component({
  selector: 'app-about-creator',
  templateUrl: './about-creator.component.html',
  styleUrls: ['./about-creator.component.scss']
})
export class AboutCreatorComponent implements OnInit {
  @Input()
  public creator_id : Number;
  private loading : boolean = true;
  private error : string;
  public creator: Creator = {} as Creator;
  public staticEndPoint;
  constructor(public creatorService : CreatorService) { }

  ngOnInit() {
    console.log(this.creator_id);
    this.staticEndPoint = AppSettings.getStaticEndpoint()
    this.getCreator(this.creator_id);
  }

  public getCreator(id : Number){
    this.loading = true;
    this.creatorService.getCreator(id).subscribe(data=> {
      console.log(data);
      this.loading = false;
      this.creator = data;
    },err=>{
      this.loading = false;
      this.error = JSON.stringify(err.error);
    })
  }

}
