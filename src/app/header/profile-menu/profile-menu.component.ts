import { Component, OnInit } from '@angular/core';
import {Creator} from "../../models/creator.model";
import {CreatorService} from "../../services/creator.service";
import {AppSettings} from "../../app.settings";

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss']
})
export class ProfileMenuComponent implements OnInit {
  public user : Creator = {} as Creator;
  public loading : boolean = true;
  public error : string = '';
  public staticEndpoint : string = '';
  public showAnchors : boolean =false;
  constructor(public creatorService : CreatorService) { }

  ngOnInit() {
    this.staticEndpoint = AppSettings.getStaticEndpoint();
    this.getUser();
  }

  public getUser() {
    this.creatorService.getUser().subscribe(data=>{
      console.log(data);
      this.user = data;
      this.loading = false;
    },err=>{
      this.loading = false;
      this.error = JSON.stringify(err.error)
    })
  }
}
