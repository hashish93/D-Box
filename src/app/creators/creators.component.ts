import {Component, OnInit} from '@angular/core';
import {AppSettings} from '../app.settings';
import {CreatorService} from '../services/creator.service';
import {Creator} from '../models/creator.model';
import {VideoService} from '../services/video.service';
// import {Title} from '@angular/platform-browser';
import {AuthService} from '../services/auth-service.service';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {MetaService} from "@ngx-meta/core";

@Component({
    selector: 'app-creators',
    templateUrl: './creators.component.html',
    styleUrls: ['./creators.component.scss']
})
export class CreatorsComponent implements OnInit {
    public loading: boolean = true;
    public error: string = '';
    public limit: number = 12;
    public data: Creator[] = [];
    public total: Number = 0;
    public current_page: number = 1;
    private staticEndPoint: string = '';
    public frontEndPoint;

    constructor(public creatorService: CreatorService, /*public titleService: Title,*/
                public authService: AuthService,
                public router: Router,
                public userService: UserService,
                private readonly meta: MetaService) {
        // this.titleService.setTitle('القنوات');
    }

    ngOnInit() {
        this.staticEndPoint = AppSettings.getStaticEndpoint();
        this.frontEndPoint = AppSettings.getFrontEndpoint();
        this.getCreators();
        // meta tags
        this.setMeta();
    }

    public getCreators() {
        this.loading = true;
        this.creatorService.getCreators(this.limit, this.current_page, 2).subscribe(data => {
            this.loading = false;
            this.data = data.data;
            this.total = data.total;
            this.error = '';
        }, err => {
            this.error = JSON.stringify(err.error);
            this.loading = false;
        })
    }

    public pageChanged(event) {
        this.current_page = event;
        this.getCreators();
    }

    public followCreator(creator) {
        this.userService.getUserData().subscribe(data => {
            let user = data;
            if (user.id != creator._id) {
                if (this.authService.isAuthenticated()) {
                    creator.is_followed = !creator.is_followed;
                    this.creatorService.followCreator(creator._id).subscribe(data => {
                    })
                } else {
                    this.router.navigate(['login']);
                }
            }
        }, err => {
            this.router.navigate(['login']);
        });
    }

    public setMeta() {
        this.meta.setTitle('Piksels | قنوات الموقع');
        this.meta.setTag('description', 'Piksels | قنوات الموقع');
        this.meta.setTag('og:title', 'Piksels | قنوات الموقع');
        this.meta.setTag('og:description', 'Piksels | قنوات الموقع');
        this.meta.setTag('image', this.frontEndPoint + '/assets/images/x-logo.png');
        this.meta.setTag('og:image', this.frontEndPoint + '/assets/images/x-logo.png');
        this.meta.setTag('og:image:width', '781');
        this.meta.setTag('og:image:height', '289');
        this.meta.setTag('og:image:type', 'image/png');
        this.meta.setTag('og:url', this.frontEndPoint + this.router.url);
    }
}
