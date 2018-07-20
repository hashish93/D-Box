import {Component, OnInit, Input, Output, EventEmitter, AfterViewInit} from '@angular/core';
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {AppSettings} from "../../app.settings";
import {PrettyPrintPipe} from "../../pipes/pretty-print-pipe";
import {Creator} from "../../models/creator.model";
import {SettingsComponent} from "../settings/settings.component";
import {CountryService} from "../../services/country.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public user : Creator = {} as Creator;
  public loading : boolean = false;
  public countries = [];
  public error : string = '';
  public staticEndPoint : string = '';
  public edit:any;

  constructor(public userService : UserService,public countryService: CountryService) { }


  ngOnInit() {
    this.staticEndPoint = AppSettings.getStaticEndpoint();
    this.edit={section1:false,section2:false};
    this.getUserData();
    this.getCountries();
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

  public getCountries() {
    this.countries = this.countryService.getCountries();
  }

  public OnClickSection(section:any){
    console.log(section);
    switch(section){
      case 'section1':
        if(!this.edit.section2)
            this.edit.section1=!this.edit.section1;
        break;
      case 'section2':
        if(!this.edit.section1)
          this.edit.section2=!this.edit.section2;
        break;
    }



  }
}
