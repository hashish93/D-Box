import {Component, OnInit} from '@angular/core';
import {VideoService} from "../../services/video.service";
import {AppSettings} from "../../app.settings";
import {Video} from "../../models/video.model";
// import {Title} from '@angular/platform-browser';
import {MetaService} from "@ngx-meta/core";
import {Router} from '@angular/router';

@Component({
    selector: 'app-favorites',
    templateUrl: 'favorites.component.html',
    styleUrls: ['favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
    public current_page: number = 1;
    public limit: number = 6;
    public loading: boolean = false;
    public error: string = '';
    public data: Video[] = [];
    public total: Number = 0;
    private staticEndPoint: string = '';
    public frontEndPoint;

    constructor(public videoService: VideoService, /*public titleService : Title*/private readonly meta: MetaService, public router: Router) {
        // this.titleService.setTitle('الفيديوهات المفضلة');
    }

    ngOnInit() {
        this.staticEndPoint = AppSettings.getStaticEndpoint();
        this.frontEndPoint = AppSettings.getFrontEndpoint();
        this.getLikedVideos();

        // meta tags
        this.setMeta();
    }

    public pageChanged(event) {
        this.current_page = event;
        this.getLikedVideos();
    }

    public getLikedVideos() {
        this.loading = true;
        this.videoService.getLikedVideos(this.current_page, this.limit, 2).subscribe(data => {
            this.data = data.data;
            this.total = data.total;
            this.loading = false;
            this.error = '';
        }, err => {
            this.error = JSON.stringify(err.error);
            this.loading = false;
        })
    }

    public unlikeVideo(video) {
        video.counters.likes -= 1;
        this.videoService.likeVideo(video.id).subscribe(data => {
            this.getLikedVideos();
        });
    }

    public setMeta() {
        this.meta.setTitle('Piksels | الفيديوهات المفضلة');
        this.meta.setTag('description', 'Piksels | الفيديوهات المفضلة');
        this.meta.setTag('og:title', 'Piksels | الفيديوهات المفضلة');
        this.meta.setTag('og:description', 'Piksels | الفيديوهات المفضلة');
        this.meta.setTag('image', this.frontEndPoint + '/assets/images/x-logo.png');
        this.meta.setTag('og:image', this.frontEndPoint + '/assets/images/x-logo.png');
        this.meta.setTag('og:image:width', '781');
        this.meta.setTag('og:image:height', '289');
        this.meta.setTag('og:image:type', 'image/png');
        this.meta.setTag('og:url', this.frontEndPoint + this.router.url);
    }
}
