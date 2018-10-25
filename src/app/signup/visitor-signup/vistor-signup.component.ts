import {Component, OnInit, Inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {Creator} from "../../models/creator.model";
import {NgForm} from "@angular/forms";
import {CreatorService} from "../../services/creator.service";
import {Router} from "@angular/router";
import {AuthService as SocialAuthService, FacebookLoginProvider, GoogleLoginProvider} from 'angular-6-social-login';
import {AuthService} from "../../services/auth-service.service";
// import {Title} from '@angular/platform-browser';
import {MetaService} from "@ngx-meta/core";
import {AppSettings} from "../../app.settings";

@Component({
    selector: 'app-visitor-signup',
    templateUrl: 'visitor-signup.component.html',
    styleUrls: ['visitor-signup.component.scss']
})
export class VistorSignupComponent implements OnInit {
    public visitor: Creator = {} as Creator;
    public error: string = '';
    public loading: boolean = false;
    public success: boolean = false;
    public validatePassword: boolean = false;
    public frontEndPoint;

    constructor(public creatorService: CreatorService, public router: Router, public authService: AuthService, public socialAuthService: SocialAuthService, /*public titleService: Title,*/ @Inject(PLATFORM_ID) private platformId: Object, private readonly meta: MetaService) {
        // this.titleService.setTitle('تسجيل كزائر');
    }

    ngOnInit() {
        this.frontEndPoint = AppSettings.getFrontEndpoint();

        // meta tags
        this.setMeta();

    }

    public check_password(event) {
        this.validatePassword = !!(this.visitor.password && this.visitor.password_confirmation && this.visitor.password === this.visitor.password_confirmation);
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

    public onFormSubmit(visitorForm) {
        if (visitorForm.valid) {
            this.loading = true;
            this.error = '';
            this.success = false;
            Object.keys(this.visitor).forEach((key) => (this.visitor[key] == null) && delete this.visitor[key]);
            this.creatorService.addVisitor(this.visitor).subscribe(data => {
                this.loading = false;
                this.success = true;
                this.router.navigate(['/login']);
            }, err => {
                this.loading = false;
                this.success = false;
                if (err && err.error && err.error.email) {
                    this.error = JSON.stringify(err.error.email.toString());
                } else if (err && err.error && err.error.password) {
                    this.error = JSON.stringify(err.error.password.toString());
                } else {
                    this.error = JSON.stringify(err.error);
                }
            })
        }
    }

    public setMeta() {
        this.meta.setTitle('Piksels | تسجيل كزائر');
        this.meta.setTag('description', 'Piksels | تسجيل كزائر');
        this.meta.setTag('og:title', 'Piksels | تسجيل كزائر');
        this.meta.setTag('og:description', 'Piksels | تسجيل كزائر');
        this.meta.setTag('image', this.frontEndPoint + '/assets/images/x-logo.png');
        this.meta.setTag('og:image', this.frontEndPoint + '/assets/images/x-logo.png');
        this.meta.setTag('og:image:width', '781');
        this.meta.setTag('og:image:height', '289');
        this.meta.setTag('og:image:type', 'image/png');
        this.meta.setTag('og:url', this.frontEndPoint + this.router.url);
    }
}

