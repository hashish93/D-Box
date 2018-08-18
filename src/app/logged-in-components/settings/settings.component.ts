import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../models/user.model";
import {TabsetComponent} from "ngx-bootstrap";
import {UserService} from "../../services/user.service";
import {Creator} from "../../models/creator.model";
import {Observable} from "rxjs";
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public selected:string = '';
  public tabs = ['favorites' , 'followers' , 'revenue' , 'profile','statistics'];
  @ViewChild(TabsetComponent) tabset: TabsetComponent;
  public loading : boolean = false;
  public error : string = '';
  private user : Creator = {} as Creator;

  constructor(public userService : UserService,public route : ActivatedRoute,public router : Router,public location: Location ,public titleService: Title) {
    this.titleService.setTitle('الاعدادات');
  }

  ngOnInit() {

    this.route.queryParams.forEach((params : any) => {
      if(params && params.tab &&
        (params.tab=='favorites' || params.tab == 'profile' || params.tab=='followers'
        || params.tab =='revenue' || params.tab=='upload' || params.tab == 'my-videos' || params.tab=='statistics')){
        this.selected = params.tab;
      }else{
        this.selected = 'favorites';
      }
    });

    this.getUserData();
  }

  public onSelect(event){
    if(event && event.id){
      this.selected = event.id;
      this.router.navigate(['/settings'],{queryParams:{tab:event.id}})
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
