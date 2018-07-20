import {Component, OnInit, Input, Output, EventEmitter, AfterViewInit} from '@angular/core';
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {AppSettings} from "../../app.settings";
import {PrettyPrintPipe} from "../../pipes/pretty-print-pipe";
import {Creator} from "../../models/creator.model";
import {SettingsComponent} from "../settings/settings.component";
import {CountryService} from "../../services/country.service";
import {Form} from "@angular/forms";
import {CreatorService} from "../../services/creator.service";
import {NotificationsService} from "angular2-notifications";

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
  public validatePassword : boolean = false;
  public fileView : any;
  public file:any;

  constructor(public userService : UserService,public countryService: CountryService , public creatorService : CreatorService, public  notificationService : NotificationsService) { }


  ngOnInit() {
    this.staticEndPoint = AppSettings.getStaticEndpoint();
    this.edit={section1:false,section2:false,section3:false,section4:false};
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

  public check_password(event) {
    this.validatePassword = !!(this.user.password && this.user.password_confirmation && this.user.password === this.user.password_confirmation);
  }

  public OnClickSection(section:any){
    console.log(section);
    switch(section) {
      case 'section1':
        if (!this.edit.section2 && !this.edit.section3 && !this.edit.section4){
          this.edit.section1 = !this.edit.section1;
          if (!this.edit.section1)
            this.saveUser();
        }

        break;
      case 'section2':
        if (!this.edit.section1 && !this.edit.section3 && !this.edit.section4) {
        this.edit.section2 = !this.edit.section2;
        if (!this.edit.section2)
          this.saveUser();
        }
        break;
      case 'section3':
        if(!this.edit.section1 && !this.edit.section2 && !this.edit.section4){
          this.edit.section3=!this.edit.section3;
          if(!this.edit.section3)
            this.saveUser();
        }
        break;
      case 'section4':
        if(!this.edit.section1 && !this.edit.section2 && !this.edit.section3){
          this.edit.section4=!this.edit.section4;
          if(!this.edit.section4)
            this.saveUser();
        }
        break;
    }


  }
  public saveUser(){
    this.loading = true;
    this.creatorService.updateCreator(this.user,this.file).subscribe(data=>{
      this.file = null;
      this.fileView = null;
      this.loading = false;
      this.error = '';
      this.notificationService.success('تم تعديل المستخدم بنجاح','',{timeOut: 3000});
      this.getUserData();
    },err=>{
      this.file = null;
      this.fileView = null;
      this.error = JSON.stringify(err.error);
      this.loading = false;
    })
  }


  public onFileChanged(event:any) {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      var extn = this.file.name.split(".").pop();
      console.log(this.file);
      console.log(extn);
      if (event.target.files[0].size / 1024 / 1024 > 3)
        this.notificationService.error("الحد الاقصى للصورة 3 ميجا بايت",'',{timeOut: 3000});
      if(extn == 'jpg' || extn == 'gif' || extn == 'png'){
        var reader = new FileReader();
        reader.onload = (event: ProgressEvent) => {
          this.fileView = (<FileReader>event.target).result;
        };

        reader.readAsDataURL(this.file);
        this.saveUser()
      }
      else{
        this.notificationService.error('من فضلك اختار ملف من نوع صورة','',{timeOut: 3000})
      }

    }
  }

  // public onFileChanged(event) {
  //   const file = event.target.files[0];
  //   if(file){
  //     var extn = file.name.split(".").pop();
  //     console.log(file);
  //     console.log(extn);
  //     if(extn == 'jpg' || extn == 'gif' || extn == 'png'){
  //       // this.fileView = URL.createObjectURL(file);
  //       var reader = new FileReader();
  //       this.fileView = reader.readAsDataURL(file);
  //       console.log(this.fileView)
  //     }
  //   }
  // }
}
