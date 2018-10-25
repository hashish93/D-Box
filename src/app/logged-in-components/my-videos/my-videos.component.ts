import {Component, OnInit} from '@angular/core';
import {Video} from "../../models/video.model";
import {VideoService} from "../../services/video.service";
import {AppSettings} from "../../app.settings";
import {Observable} from "rxjs";
import {NotExpr} from "@angular/compiler";
import {NotificationsService} from "angular2-notifications";
import {Router} from "@angular/router";
import {CreatorService} from '../../services/creator.service';
// import {Title} from '@angular/platform-browser';
import {MetaService} from "@ngx-meta/core";

@Component({
    selector: 'app-my-videos',
    templateUrl: './my-videos.component.html',
    styleUrls: ['./my-videos.component.scss']
})
export class MyVideosComponent implements OnInit {
    public loading: boolean = false;
    public error: string = '';
    public videos: Video[] = [];
    public total: number = 0;
    public current_page: number = 1;
    public limit: number = 10;
    public staticEndPoint: string = '';
    public checked: boolean = false;
    public frontEndPoint;

    constructor(public videoService: VideoService, public notificationService: NotificationsService, public router: Router, /*public titleService: Title*/private readonly meta: MetaService) {
        // this.titleService.setTitle('فيديوهاتي');
    }

    ngOnInit() {
        this.staticEndPoint = AppSettings.getStaticEndpoint();
        this.frontEndPoint = AppSettings.getFrontEndpoint();
        this.getMyVideos();

        // meta tags
        this.setMeta();
    }

    public pageChanged(event) {
        this.current_page = event;
        this.getMyVideos();
    }

    public getMyVideos() {
        this.loading = true;
        this.videoService.getMyVideos(this.current_page, this.limit, 2).subscribe(data => {
            this.videos = data.data;
            this.total = data.total;
            this.loading = false;
            this.error = '';
        }, err => {
            this.loading = false;
            this.error = JSON.stringify(err.error);
        })
    }

    public openLink(video: Video) {
        if (video.published == 1 && video.activated == 1) {
            console.log(video)
            this.router.navigate(['video/' + video.id]);
        }
    }


    public deleteVideo(id) {
        this.videoService.deleteVideo(id).subscribe(data => {
            this.notificationService.success("تم حذف الفيديو بنجاح", "", {timeOut: 3000})
            this.getMyVideos()
        }, err => {
            this.notificationService.error("خطأ في حذف الفيديو", "", {timeOut: 3000})
        })

    }

    public toggleCheck() {
        this.checked = !this.checked;
        for (let video of this.videos) {
            video.checked = this.checked;
        }
    }

    public deleteMultiple() {
        let IDS = [];
        for (let video of this.videos) {
            if (video.checked)
                IDS.push(video.id);
        }
        if (IDS.length > 0) {
            this.videoService.deleteVideos(IDS).subscribe(data => {
                this.notificationService.success("تم حذف الفيديوهات بنجاح", "", {timeOut: 3000})
                this.getMyVideos()
            }, err => {
                this.notificationService.error("خطأ في حذف الفيديوهات", "", {timeOut: 3000})
            })
        }
    }

    public setMeta() {
        this.meta.setTitle('Piksels | فيديوهاتي');
        this.meta.setTag('description', 'Piksels | فيديوهاتي');
        this.meta.setTag('og:title', 'Piksels | فيديوهاتي');
        this.meta.setTag('og:description', 'Piksels | فيديوهاتي');
        this.meta.setTag('image', this.frontEndPoint + '/assets/images/x-logo.png');
        this.meta.setTag('og:image', this.frontEndPoint + '/assets/images/x-logo.png');
        this.meta.setTag('og:image:width', '781');
        this.meta.setTag('og:image:height', '289');
        this.meta.setTag('og:image:type', 'image/png');
        this.meta.setTag('og:url', this.frontEndPoint + this.router.url);
    }

}
