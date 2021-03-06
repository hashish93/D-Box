import {Component, OnInit, Input, Output, EventEmitter, AfterViewInit, Inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {User} from "../../models/user.model";
import {UserService} from "../../services/user.service";
import {AppSettings} from "../../app.settings";
import {Creator} from "../../models/creator.model";
import {SettingsComponent} from "../settings/settings.component";
import {CountryService} from "../../services/country.service";
import {Form} from "@angular/forms";
import {CreatorService} from "../../services/creator.service";
import {NotificationsService} from "angular2-notifications";
import {AuthService} from '../../services/auth-service.service';
import {Router} from '@angular/router';
import {DataService} from '../../services/data.service';
// import {Title} from '@angular/platform-browser';
import {MetaService} from "@ngx-meta/core";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
    public user: Creator = {} as Creator;
    public loading: boolean = false;
    public countries = [];
    public error: string = '';
    public staticEndPoint: string = '';
    public edit: any;
    public validatePassword: boolean = false;
    public fileView: any;
    public file: any;
    public fileViewCover: any;
    public fileCover: any;
    public frontEndPoint;

    constructor(public userService: UserService, public authService: AuthService,
                public countryService: CountryService, public creatorService: CreatorService,
                public dataService: DataService, public  notificationService: NotificationsService,
                public router: Router, /*public titleService: Title,*/ @Inject(PLATFORM_ID) private platformId: Object, private readonly meta: MetaService) {
        // this.titleService.setTitle('الملف الشخصي');
    }


    ngOnInit() {
        this.staticEndPoint = AppSettings.getStaticEndpoint();
        this.frontEndPoint = AppSettings.getFrontEndpoint();
        this.edit = {section1: false, section2: false, section3: false, section4: false};
        this.getUserData();
        this.getCountries();

        // meta tags
        this.setMeta();
    }

    private getUserData() {
        localStorage.removeItem('user');
        this.loading = true;
        this.userService.getUserData().subscribe(data => {
            this.loading = false;
            this.user = data;
            localStorage.setItem('user', JSON.stringify(data));
        }, err => {
            this.loading = false;
            this.error = JSON.stringify(err.error);
        })
    }

    public getCountries() {
        this.countries = this.countryService.getCountries();
    }

    public check_password(event) {
        this.validatePassword = !!(this.user.password && this.user.password_confirmation && this.user.password === this.user.password_confirmation);
    }

    public reset() {
        this.edit.section1 = false;
        this.edit.section2 = false;
        this.edit.section3 = false;
        this.edit.section4 = false;
        this.getUserData();
    }

    public OnClickSection(section: any) {
        switch (section) {
            case 'section1':
                if (!this.edit.section2 && !this.edit.section3 && !this.edit.section4) {
                    this.edit.section1 = !this.edit.section1;
                    if (!this.edit.section1)
                        this.saveUser();
                }

                break;
            case 'section2':
                if (!this.edit.section1 && !this.edit.section3 && !this.edit.section4) {
                    this.edit.section2 = !this.edit.section2;
                    if (!this.edit.section2)
                        this.saveUser();
                }
                break;
            case 'section3':
                if (!this.edit.section1 && !this.edit.section2 && !this.edit.section4) {
                    this.edit.section3 = !this.edit.section3;
                    if (!this.edit.section3)
                        this.saveUser();
                }
                break;
            case 'section4':
                if (!this.edit.section1 && !this.edit.section2 && !this.edit.section3) {
                    this.edit.section4 = !this.edit.section4;
                    if (!this.edit.section4)
                        this.saveUser();
                }
                break;
        }

    }


    public closeAccount() {
        this.user.activated = 0;
        this.saveUser('redirect');
    }

    public saveUser(redirect?, changePhoto?) {
        this.loading = true;
        this.creatorService.updateCreator(this.user, this.file, this.fileCover).subscribe(data => {
            if (changePhoto) {
                this.dataService.newEvent('photoChanged');
            }
            this.file = null;
            this.fileView = null;
            this.loading = false;
            this.error = '';
            this.notificationService.success('تم تعديل المستخدم بنجاح', '', {timeOut: 3000});
            if (redirect) {
                // Client only code.
                if (isPlatformBrowser(this.platformId)) {
                    this.authService.logout().subscribe(data => {
                        localStorage.clear();
                        this.router.navigate(['']);
                    }, err => {
                        localStorage.clear();
                        this.router.navigate(['']);
                    });
                }
            } else {
                this.getUserData();
            }

        }, err => {
            this.file = null;
            this.fileView = null;
            if (err && err.error && err.error.password) {
                this.error = JSON.stringify(err.error.password.toString());
            } else {
                this.error = JSON.stringify(err.error);
            }
            this.loading = false;
            window.scrollTo(0, 100);

        })
    }


    public onFileChanged(event: any) {
        if (event.target.files && event.target.files[0]) {
            this.file = event.target.files[0];
            var extn = this.file.name.split(".").pop();
            if (event.target.files[0].size / 1024 / 1024 > 3) {
                this.notificationService.error("الحد الاقصى للصورة 3 ميجا بايت", '', {timeOut: 3000});
                return;
            }
            if (extn.toLowerCase() == 'jpg' || extn.toLowerCase() == 'jpeg' || extn.toLowerCase() == 'gif' || extn.toLowerCase() == 'png') {
                var reader = new FileReader();
                reader.onload = (event: ProgressEvent) => {
                    this.fileView = (<FileReader>event.target).result;
                };

                reader.readAsDataURL(this.file);
                this.saveUser(null, true);
            }
            else {
                this.notificationService.error('من فضلك اختار ملف من نوع صورة', '', {timeOut: 3000})
            }

        }
    }

    public onCoverFileChanged(event: any) {
        if (event.target.files && event.target.files[0]) {
            this.fileCover = event.target.files[0];
            var extn = this.fileCover.name.split(".").pop();
            if (event.target.files[0].size / 1024 / 1024 > 3) {
                this.notificationService.error("الحد الاقصى للصورة 3 ميجا بايت", '', {timeOut: 3000});
                return;
            }

            if (extn.toLowerCase() == 'jpg' || extn.toLowerCase() == 'jpeg' || extn.toLowerCase() == 'gif' || extn.toLowerCase() == 'png') {
                var reader = new FileReader();
                reader.onload = (event: ProgressEvent) => {
                    this.fileViewCover = (<FileReader>event.target).result;
                };

                reader.readAsDataURL(this.fileCover);
                this.saveUser();
            }
            else {
                this.notificationService.error('من فضلك اختار ملف من نوع صورة', '', {timeOut: 3000})
            }

        }
    }

    public setMeta() {
        this.meta.setTitle('Piksels | الملف الشخصي');
        this.meta.setTag('description', 'Piksels | الملف الشخصي');
        this.meta.setTag('og:title', 'Piksels | الملف الشخصي');
        this.meta.setTag('og:description', 'Piksels | الملف الشخصي');
        this.meta.setTag('image', this.frontEndPoint + '/assets/images/x-logo.png');
        this.meta.setTag('og:image', this.frontEndPoint + '/assets/images/x-logo.png');
        this.meta.setTag('og:image:width', '781');
        this.meta.setTag('og:image:height', '289');
        this.meta.setTag('og:image:type', 'image/png');
        this.meta.setTag('og:url', this.frontEndPoint + this.router.url);
    }

}

