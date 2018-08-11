import { Component, OnInit } from '@angular/core';
import {Creator} from "../../models/creator.model";
import {CreatorService} from "../../services/creator.service";
import {AppSettings} from "../../app.settings";
import {AuthService} from "../../services/auth-service.service";
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
})
export class ProfileMenuComponent implements OnInit {
  public user : Creator = {} as Creator;
  public loading : boolean = true;
  public error : string = '';
  public staticEndpoint : string = '';
  public showAnchors : boolean =false;
  constructor(public creatorService : CreatorService, public authService : AuthService , public dataService : DataService) { }

  ngOnInit() {
    this.staticEndpoint = AppSettings.getStaticEndpoint();
    this.getUser();
    this.dataService.events$.forEach(event => {
      console.log(event);
      if(event == 'photoChanged'){
        this.getUser();
      }
    });

  }

  public logout(){
    this.authService.logout().subscribe(data=>{
      localStorage.clear()
    },error=>{
      localStorage.clear()
    });
  }

  public getUser() {
    this.loading = true;
    this.creatorService.getUser().subscribe(data=>{
      this.user = data;
      this.loading = false;
    },err=>{
      this.loading = false;
      this.error = JSON.stringify(err.error)
    })
  }
}
