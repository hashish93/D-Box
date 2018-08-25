import { Component, OnInit, Inject, PLATFORM_ID  } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {User} from "../models/user.model";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {AuthService} from "../services/auth-service.service";
import {AuthService as SocialAuthService, FacebookLoginProvider, GoogleLoginProvider} from 'angular-6-social-login';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user: User = {} as User;
  public error : string = '';
  public loading : boolean = false;
  constructor(public authService : AuthService ,public router : Router,
              public socialAuthService: SocialAuthService , public userService : UserService,public titleService: Title, @Inject(PLATFORM_ID) private platformId: Object) {
    this.titleService.setTitle('تسجيل الدخول');
  }

  ngOnInit() {
    this.user.remember_me = false;
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

  public onFormSubmit(loginForm){
    if(loginForm.valid){
      this.loading = true;
      this.error = '';
      this.authService.login(this.user).subscribe(data=> {
        this.loading = false;
          // Client only code.
          if (isPlatformBrowser(this.platformId)) {
              localStorage.setItem('access_token',data.access_token);
          }
        this.userService.getUserData().subscribe(data=>{
          let userData =data;
          if(userData.is_creator == 1){
            this.router.navigate(['/settings'],{queryParams:{tab:'statistics'}})
          }else{
            this.router.navigate(['/settings'],{queryParams:{tab:'favorites'}})
          }
        },err=>{
          this.router.navigate(['/']);
        });

      },err=>{
        this.loading = false;
        if(err.error.message)
          this.error = 'الاسم المستخدم او كلمة المرور غير صحيحين';
        else
          this.error = JSON.stringify(err.error);
      })
    }
  }

}

