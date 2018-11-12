import {Component, OnInit} from '@angular/core';
import {Creator} from "../../models/creator.model";
import {CreatorService} from "../../services/creator.service";
import {Router} from "@angular/router";
// import {Title} from '@angular/platform-browser';
import {MetaService} from "@ngx-meta/core";
import {AppSettings} from "../../app.settings";

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
    public matched_user: boolean = false;
    public validatePassword: boolean = false;
    public frontEndPoint;

    constructor(public creatorService: CreatorService, public router: Router, /*public titleService: Title*/private readonly meta: MetaService) {
        // this.titleService.setTitle('تسجيل كمبدع');
    }

    ngOnInit() {
        this.frontEndPoint = AppSettings.getFrontEndpoint();
        this.creator.user_type = 2;
        // meta tags
        this.setMeta();
    }

    public check_password(event) {
        this.validatePassword = !!(this.creator.password && this.creator.password_confirmation && this.creator.password === this.creator.password_confirmation);
    }

    public OnClick(creatorForm) {
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
            this.creatorService.addVisitor(this.creator).subscribe(data => {
                this.loading = false;
                this.success = true;
                this.matched_user = false;
                this.creator = {} as Creator;
                creatorForm.reset();
                // this.router.navigate(['/login']);
            }, (err) => {
                this.loading = false;
                this.success = false;
                if (err && err.error && err.error.email) {
                    this.error = JSON.stringify(err.error.email.toString());
                } else if (err && err.error && err.error.password) {
                    this.error = JSON.stringify(err.error.password.toString());
                } else if (err && err.error.message) {
                    this.error = JSON.stringify(err.error.message.toString());
                } else {
                    this.error = JSON.stringify(err.error);
                }
                if (err.status == 409) {
                    this.matched_user = true;
                    this.error = ''
                }
            })
        }
    }

    public setMeta() {
        this.meta.setTitle('Piksels | تسجيل كمبدع');
        this.meta.setTag('description', 'Piksels | تسجيل كمبدع');
        this.meta.setTag('og:title', 'Piksels | تسجيل كمبدع');
        this.meta.setTag('og:description', 'Piksels | تسجيل كمبدع');
        this.meta.setTag('image', this.frontEndPoint + '/assets/images/x-logo.png');
        this.meta.setTag('og:image', this.frontEndPoint + '/assets/images/x-logo.png');
        this.meta.setTag('og:image:width', '781');
        this.meta.setTag('og:image:height', '289');
        this.meta.setTag('og:image:type', 'image/png');
        this.meta.setTag('og:url', this.frontEndPoint + this.router.url);
    }
}
