import { Component, OnInit } from '@angular/core';
import {Creator} from "../../models/creator.model";
import {NgForm} from "@angular/forms";
import {CreatorService} from "../../services/creator.service";
import {Router} from "@angular/router";
import {AuthService as SocialAuthService, FacebookLoginProvider, GoogleLoginProvider} from 'angular-6-social-login';
import {AuthService} from "../../services/auth-service.service";

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

  constructor(public creatorService : CreatorService, public router : Router,public authService : AuthService ,public socialAuthService: SocialAuthService ) { }

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
        console.log(socialPlatform+" sign in data : " , userData);
        this.authService.loginWithFacebook(userData.token).subscribe(data=> {
          this.loading = false;
          localStorage.setItem('access_token',data.access_token);
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
      this.creatorService.addVisitor(this.visitor).subscribe(data=> {
        this.loading = false;
        this.success = true;
        this.router.navigate(['/login']);
      },err=>{
        this.loading = false;
        this.success = false;
        this.error = JSON.stringify(err.error);
      })
    }
  }

}
