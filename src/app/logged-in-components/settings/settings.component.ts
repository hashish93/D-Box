import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../models/user.model";
import {TabsetComponent} from "ngx-bootstrap";

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public selected:string = '';
  public tabs = ['favorites' , 'followers' , 'revenue' , 'profile'];
  @ViewChild(TabsetComponent) tabset: TabsetComponent;

  constructor() { }

  ngOnInit() {
    this.selected = 'favorites';
  }

  public onSelect(event){
    console.log(event)
    if(event && event.id){
      this.selected = event.id;
      console.log("on select")
    }
  }
}
