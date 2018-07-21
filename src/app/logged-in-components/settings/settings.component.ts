import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../models/user.model";
import {TabsetComponent} from "ngx-bootstrap";
import {UserService} from "../../services/user.service";
import {Creator} from "../../models/creator.model";

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public selected:string = '';
  public tabs = ['favorites' , 'followers' , 'revenue' , 'profile'];
  @ViewChild(TabsetComponent) tabset: TabsetComponent;
  public loading : boolean = false;
  public error : string = '';
  private user : Creator = {} as Creator;

  constructor(public userService : UserService) { }
  ngOnInit() {
    this.selected = 'favorites';
    this.getUserData();
  }

  public onSelect(event){
    if(event && event.id){
      this.selected = event.id;
    }
  }

  private getUserData() {
    this.loading = true;
    this.userService.getUserData().subscribe(data=>{
      this.loading = false;
      this.user = data;
    },err=>{
      this.loading = false;
      this.error = JSON.stringify(err.error);
    })
  }
}
