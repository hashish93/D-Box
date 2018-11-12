import {Component, OnInit, Inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {User} from "../models/user.model";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {AuthService} from "../services/auth-service.service";
import {AuthService as SocialAuthService, FacebookLoginProvider, GoogleLoginProvider} from 'angular-6-social-login';
// import {Title} from '@angular/platform-browser';
import {MetaService} from "@ngx-meta/core"
import {AppSettings} from "../app.settings";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public user: User = {} as User;
    public error: string = '';
    public loading: boolean = false;
    public frontEndPoint;

    constructor(public authService: AuthService, public router: Router,
                public socialAuthService: SocialAuthService, public userService: UserService, /*public titleService: Title,*/ @Inject(PLATFORM_ID) private platformId: Object, private readonly meta: MetaService) {
        // this.titleService.setTitle('تسجيل الدخول');
    }

    ngOnInit() {
        this.frontEndPoint = AppSettings.getFrontEndpoint();
        this.user.remember_me = false;
        // meta tags
        this.setMeta();

    }

    public socialSignIn(socialPlatform: string) {
        let socialPlatformProvider;
        if (socialPlatform == "facebook") {
            socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
        }
        this.socialAuthService.signIn(socialPlatformProvider).then(
            (userData) => {
                this.loading = true;
                this.error = '';
                this.authService.loginWithFacebook(userData.token).subscribe(data => {
                    this.loading = false;
                    // Client only code.
                    if (isPlatformBrowser(this.platformId)) {
                        localStorage.setItem('access_token', data.access_token);
                    }

                    this.router.navigate(['/']);
                }, err => {
                    this.loading = false;
                    if (err.error.message)
                        this.error = JSON.stringify(err.error.message);
                    else
                        this.error = JSON.stringify(err.error.message);
                })


            })
    }

    public onFormSubmit(loginForm) {
        if (loginForm.valid) {
            this.loading = true;
            this.error = '';
            this.authService.login(this.user).subscribe(data => {
                this.loading = false;
                // Client only code.
                if (isPlatformBrowser(this.platformId)) {
                    localStorage.setItem('access_token', data.access_token);
                }
                this.userService.getUserData().subscribe(data => {
                    let userData = data;
                    localStorage.setItem('user', JSON.stringify(userData));
                    if (userData.is_creator == 1) {
                        this.router.navigate(['/settings'], {queryParams: {tab: 'statistics'}})
                    } else {
                        this.router.navigate(['/settings'], {queryParams: {tab: 'favorites'}})
                    }
                }, err => {
                    this.router.navigate(['/']);
                });

            }, err => {
                this.loading = false;
                if (err.error.message)
                    this.error = 'الإسم المستخدم او كلمة المرور غير صحيحين';
                else
                    this.error = JSON.stringify(err.error);
            })
        }
    }

    public setMeta() {
        this.meta.setTitle('Piksels | تسجيل الدخول');
        this.meta.setTag('description', 'Piksels | تسجيل الدخول');
        this.meta.setTag('og:title', 'Piksels | تسجيل الدخول');
        this.meta.setTag('og:description', 'Piksels | تسجيل الدخول');
        this.meta.setTag('image', this.frontEndPoint + '/assets/images/x-logo.png');
        this.meta.setTag('og:image', this.frontEndPoint + '/assets/images/x-logo.png');
        this.meta.setTag('og:image:width', '781');
        this.meta.setTag('og:image:height', '289');
        this.meta.setTag('og:image:type', 'image/png');
        this.meta.setTag('og:url', this.frontEndPoint + this.router.url);
    }

}

