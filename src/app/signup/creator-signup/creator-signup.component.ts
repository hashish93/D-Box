import { Component, OnInit } from '@angular/core';
import {Creator} from "../../models/creator.model";
import {CreatorService} from "../../services/creator.service";
import {Router} from "@angular/router";
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-creator-signup',
  templateUrl: './creator-signup.component.html',
  styleUrls: ['./creator-signup.component.scss']
})
export class CreatorSignupComponent implements OnInit {
  public creator: Creator = {} as Creator;
  public error: string = '';
  public loading: boolean = false;
  public success: boolean = false;
  public matched_user : boolean = false;
  public validatePassword: boolean = false;

  constructor(public creatorService: CreatorService,public router : Router ,public titleService: Title) {
    this.titleService.setTitle('تسجيل كمبدع');
  }

  ngOnInit() {
    this.creator.user_type = 2;
  }

  public check_password(event) {
    this.validatePassword = !!(this.creator.password && this.creator.password_confirmation && this.creator.password === this.creator.password_confirmation);
  }

  public OnClick(creatorForm){
    this.creator.upgrade_account = 1;
    this.onFormSubmit(creatorForm);
  }
  public onFormSubmit(creatorForm) {
    if (creatorForm.valid) {
      this.loading = true;
      this.error = '';
      this.success = false;
      this.matched_user = false;
      Object.keys(this.creator).forEach((key) => (this.creator[key] == null) && delete this.creator[key]);
      this.creatorService.addVisitor(this.creator).subscribe(data=> {
        this.loading = false;
        this.success = true;
        this.matched_user = false;
        this.creator = {} as Creator;
        creatorForm.reset();
        // this.router.navigate(['/login']);
      }, (err)=> {
        this.loading = false;
        this.success = false;
        if(err && err.error && err.error.email){
          this.error = JSON.stringify(err.error.email.toString());
        }else if(err && err.error && err.error.password){
          this.error = JSON.stringify(err.error.password.toString());
        } else{
          this.error = JSON.stringify(err.error);
        }
        if(err.status == 409){
          this.matched_user = true;
          this.error = ''
        }
      })
    }
  }
}
