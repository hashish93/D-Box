import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {Creator} from "../../models/creator.model";
import {NgForm} from "@angular/forms";
import {CreatorService} from "../../services/creator.service";
import {Router} from "@angular/router";
import {AuthService as SocialAuthService, FacebookLoginProvider, GoogleLoginProvider} from 'angular-6-social-login';
import {AuthService} from "../../services/auth-service.service";
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-visitor-signup',
  templateUrl: 'visitor-signup.component.html',
  styleUrls: ['visitor-signup.component.scss']
})
export class VistorSignupComponent implements OnInit {
  public visitor: Creator = {} as Creator;
  public error : string = '';
  public loading : boolean = false;
  public success : boolean = false;
  public validatePassword : boolean = false;

  constructor(public creatorService : CreatorService, public router : Router,public authService : AuthService ,public socialAuthService: SocialAuthService ,public titleService: Title, @Inject(PLATFORM_ID) private platformId: Object) {
  this.titleService.setTitle('تسجيل كزائر');
}

  ngOnInit() {

  }

  public check_password(event){
    this.validatePassword = !!(this.visitor.password && this.visitor.password_confirmation && this.visitor.password === this.visitor.password_confirmation);
  }


  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if (socialPlatform == "facebook") {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        this.loading = true;
        this.error = '';
        this.authService.loginWithFacebook(userData.token).subscribe(data=> {
          this.loading = false;
            // Client only code.
            if (isPlatformBrowser(this.platformId)) {
                localStorage.setItem('access_token',data.access_token);
            }
          this.router.navigate(['/']);
        },err=>{
          this.loading = false;
          if(err.error.message)
            this.error = JSON.stringify(err.error.message);
          else
            this.error = JSON.stringify(err.error.message);
        })


      })
  }

  public onFormSubmit(visitorForm){
    if(visitorForm.valid){
      this.loading = true;
      this.error = '';
      this.success = false;
      Object.keys(this.visitor).forEach((key) => (this.visitor[key] == null) && delete this.visitor[key]);
      this.creatorService.addVisitor(this.visitor).subscribe(data=> {
        this.loading = false;
        this.success = true;
        this.router.navigate(['/login']);
      },err=>{
        this.loading = false;
        this.success = false;
        if(err && err.error && err.error.email){
          this.error = JSON.stringify(err.error.email.toString());
        }else if(err && err.error && err.error.password){
          this.error = JSON.stringify(err.error.password.toString());
        } else{
          this.error = JSON.stringify(err.error);
        }
      })
    }
  }

}

