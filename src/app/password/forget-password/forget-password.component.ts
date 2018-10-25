import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth-service.service";
import {Router} from "@angular/router";
// import {Title} from '@angular/platform-browser';
import {MetaService} from "@ngx-meta/core"
import {AppSettings} from "../../app.settings";

@Component({
    selector: 'app-forget-password',
    templateUrl: './forget-password.component.html',
    styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
    public error: string = '';
    public loading: boolean = false;
    public email: string = '';
    public frontEndPoint;

    constructor(public authService: AuthService, public router: Router, /*public titleService: Title*/private readonly meta: MetaService) {
        // this.titleService.setTitle('فقد كلمة المرور');
    }

    ngOnInit() {
        this.frontEndPoint = AppSettings.getFrontEndpoint();

        // meta tags
        this.setMeta();
    }

    public onFormSubmit(visitorForm) {
        if (visitorForm.valid) {
            this.loading = true;
            this.error = '';
            this.authService.forgetPassword(this.email).subscribe(data => {
                this.loading = false;
                this.router.navigate(['/verify-code', this.email]);
            }, err => {
                this.loading = false;
                if (err.error.message)
                    this.error = 'لم يتم العثور على اي سجل';
                else
                    this.error = JSON.stringify(err.error);

            })
        }
    }

    public setMeta() {
        this.meta.setTitle('Piksels | استعادة كلمة المرور');
        this.meta.setTag('description', 'Piksels | استعادة كلمة المرور');
        this.meta.setTag('og:title', 'Piksels | استعادة كلمة المرور');
        this.meta.setTag('og:description', 'Piksels | استعادة كلمة المرور');
        this.meta.setTag('image', this.frontEndPoint + '/assets/images/x-logo.png');
        this.meta.setTag('og:image', this.frontEndPoint + '/assets/images/x-logo.png');
        this.meta.setTag('og:image:width', '781');
        this.meta.setTag('og:image:height', '289');
        this.meta.setTag('og:image:type', 'image/png');
        this.meta.setTag('og:url', this.frontEndPoint + this.router.url);
    }
}
