import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from "../services/auth-service.service";
import {Router, ActivatedRoute} from "@angular/router";
import {Video} from "../models/video.model";
import {VideoService} from "../services/video.service";
import {AppSettings} from "../app.settings";
import {DomSanitizer, SafeResourceUrl/*, Title,*/} from '@angular/platform-browser';
import {Creator} from "../models/creator.model";
import {DOCUMENT} from '@angular/common';
import {MetaService} from '@ngx-meta/core';
import {CreatorService} from '../services/creator.service';
import {UserService} from '../services/user.service';

@Component({
    selector: 'app-video-details',
    templateUrl: './video-details.component.html',
    styleUrls: ['./video-details.component.scss'],

})
export class VideoDetailsComponent implements OnInit {
    public video: Video = {} as Video;
    public creator: Creator = {} as Creator;
    public loading: boolean = true;
    public share: boolean = false;
    public slide: boolean = false;
    public videoEndPoint;
    public staticEndPoint;
    public frontEndPoint;
    public facebookEndPoint;
    url: SafeResourceUrl;
    facebookURL: SafeResourceUrl;
    public error: String = '';
    public document: any;

    constructor(public authService: AuthService, public router: Router,
                public  route: ActivatedRoute, public videoService: VideoService, public sanitizer: DomSanitizer, @Inject(DOCUMENT) document: any, /*public titleService : Title,*/private readonly meta: MetaService,
                public creatorService: CreatorService,
                public userService: UserService) {
        this.document = document;
        // this.titleService.setTitle('الفيديو');

    }

    ngOnInit() {
        this.videoEndPoint = AppSettings.getVideoEndpoint();
        this.staticEndPoint = AppSettings.getStaticEndpoint();
        this.frontEndPoint = AppSettings.getFrontEndpoint();
        this.facebookEndPoint = AppSettings.getFacebookEndPoint();
        this.route.params.subscribe(params => {
            this.video.id = parseInt(params["id"]);
            if (this.video.id) {
                this.getVideo(this.video.id);
                this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoEndPoint + '' + this.video.id.toString());
                this.facebookURL = this.sanitizer.bypassSecurityTrustResourceUrl(location.origin + '' + this.facebookEndPoint + '' + this.video.id.toString());
            } else {
                this.router.navigate(['']);
            }
        });

    }

    public getVideo(id: Number) {
        this.loading = true;
        this.error = '';
        this.videoService.getVideo(id).subscribe(data => {
            this.video = data;
            this.loading = false;
            // meta tags
            this.setMeta();
        }, err => {
            this.loading = false;
            this.error = JSON.stringify(err.error);
        });
    }


    public likeVideo() {
        if (this.authService.isAuthenticated()) {
            this.video.is_liked = !this.video.is_liked;
            this.video.is_liked ? this.video.counter.likes += 1 : this.video.counter.likes -= 1;
            this.videoService.likeVideo(this.video._id).subscribe(data => {
            })
        } else {
            this.router.navigate(['login'])
        }

    }

    public getCreator(creator: any) {
        this.creator = creator;
    }

    public followCreator(video) {
        this.userService.getUserData().subscribe(data => {
            let user = data;
            if (user.id != video.creator.id) {
                if (this.authService.isAuthenticated()) {
                    video.creator.is_followed = !video.creator.is_followed;
                    this.creatorService.followCreator(video.creator.id).subscribe(data => {
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
        this.meta.setTitle('Piksels | ' + this.video.title);
        this.meta.setTag('description', 'Piksels | ' + this.video.title);
        this.meta.setTag('og:title', 'Piksels | ' + this.video.title);
        this.meta.setTag('og:description', 'Piksels | ' + this.video.title);
        this.meta.setTag('image', this.staticEndPoint + this.video.thumbnails.large);
        this.meta.setTag('og:image', this.staticEndPoint + this.video.thumbnails.large);
        this.meta.setTag('og:image:width', '1280');
        this.meta.setTag('og:image:height', '720');
        this.meta.setTag('og:image:type', 'image/jpeg');
        this.meta.setTag('og:url', this.frontEndPoint + this.router.url);
    }
}
