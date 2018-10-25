import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth-service.service";
import {Router, ActivatedRoute, ParamMap} from "@angular/router";
import {switchMap} from "rxjs/internal/operators";
// import {Title} from '@angular/platform-browser';
import {MetaService} from "@ngx-meta/core"
import {AppSettings} from "../../app.settings";

@Component({
    selector: 'app-verify-code',
    templateUrl: './verify-code.component.html',
    styleUrls: ['./verify-code.component.scss']
})
export class VerifyCodeComponent implements OnInit {
    public error: string = '';
    public loading: boolean = false;
    public email: string = '';
    public code: string = '';
    public data: any;
    public frontEndPoint;

    constructor(public authService: AuthService, public router: Router, public route: ActivatedRoute, /*public titleService: Title*/private readonly meta: MetaService) {
        // this.titleService.setTitle('تحقق الكود');
    }

    ngOnInit() {
        this.frontEndPoint = AppSettings.getFrontEndpoint();
        this.email = this.route.snapshot.paramMap.get('email');

        // meta tags
        this.setMeta();
    }

    public onFormSubmit(verifyCodeForm) {
        if (verifyCodeForm.valid) {
            this.loading = true;
            this.error = '';
            this.authService.verifyCode(this.email, this.code).subscribe(data => {
                this.loading = false;
                this.router.navigate(['/reset-password', this.email]);
            }, err => {
                this.loading = false;
                if (err.error.message)
                    this.error = 'رمز استعادة كلمة المرور الذي أدخلته غير صحيح';
                else
                    this.error = JSON.stringify(err.error);
            })
        }
    }

    public setMeta() {
        this.meta.setTitle('Piksels | تحقيق الكود');
        this.meta.setTag('description', 'Piksels | تحقيق الكود');
        this.meta.setTag('og:title', 'Piksels | تحقيق الكود');
        this.meta.setTag('og:description', 'Piksels | تحقيق الكود');
        this.meta.setTag('image', this.frontEndPoint + '/assets/images/x-logo.png');
        this.meta.setTag('og:image', this.frontEndPoint + '/assets/images/x-logo.png');
        this.meta.setTag('og:image:width', '781');
        this.meta.setTag('og:image:height', '289');
        this.meta.setTag('og:image:type', 'image/png');
        this.meta.setTag('og:url', this.frontEndPoint + this.router.url);
    }
}
