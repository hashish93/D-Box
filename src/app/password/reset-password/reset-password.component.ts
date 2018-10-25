import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth-service.service";
import {Router, ActivatedRoute} from "@angular/router";
import {Creator} from "../../models/creator.model";
// import {Title} from '@angular/platform-browser';
import {MetaService} from "@ngx-meta/core"
import {AppSettings} from "../../app.settings";

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    public error: string = '';
    public loading: boolean = false;
    public validatePassword: boolean = false;
    public user: Creator = {} as Creator
    public data: any;
    public frontEndPoint;

    constructor(public authService: AuthService, public router: Router, public route: ActivatedRoute, /*public titleService: Title*/private readonly meta: MetaService) {
        // this.titleService.setTitle('اعادة تعيين كلمة السر');
    }

    ngOnInit() {
        this.frontEndPoint = AppSettings.getFrontEndpoint();
        this.user.email = this.route.snapshot.paramMap.get('email');

        // meta tags
        this.setMeta();

    }

    public check_password(event) {
        this.validatePassword = !!(this.user.password && this.user.password_confirmation && this.user.password === this.user.password_confirmation);
    }

    public onFormSubmit(resetPasswordForm) {
        if (resetPasswordForm.valid) {
            this.loading = true;
            this.error = '';
            this.authService.resetPassword(this.user).subscribe(data => {
                this.loading = false;
                this.router.navigate(['login']);
            }, err => {
                this.loading = false;
                if (err.error.password || err.error.message)
                    this.error = 'صيغة كلمة السر غير صحيحة';
                else
                    this.error = JSON.stringify(err.error);
            })
        }
    }

    public setMeta() {
        this.meta.setTitle('Piksels | اعادة تعيين كلمة السر');
        this.meta.setTag('description', 'Piksels | اعادة تعيين كلمة السر');
        this.meta.setTag('og:title', 'Piksels | اعادة تعيين كلمة السر');
        this.meta.setTag('og:description', 'Piksels | اعادة تعيين كلمة السر');
        this.meta.setTag('image', this.frontEndPoint + '/assets/images/x-logo.png');
        this.meta.setTag('og:image', this.frontEndPoint + '/assets/images/x-logo.png');
        this.meta.setTag('og:image:width', '781');
        this.meta.setTag('og:image:height', '289');
        this.meta.setTag('og:image:type', 'image/png');
        this.meta.setTag('og:url', this.frontEndPoint + this.router.url);
    }
}
