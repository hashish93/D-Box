import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Video} from '../models/video.model';
import {VideoService} from '../services/video.service';
import {t} from '../../../node_modules/@angular/core/src/render3';
import {AppSettings} from '../app.settings';
// import {Title} from '@angular/platform-browser';
import {AuthService} from '../services/auth-service.service';
import {CreatorService} from '../services/creator.service';
import {UserService} from '../services/user.service';
import {MetaService} from "@ngx-meta/core";

@Component({
    selector: 'app-results',
    templateUrl: './results.component.html',
    styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
    public pageName: string = '';
    public searchKey: string = '';
    public key_id: number = 0;
    public loading: boolean = true;
    public error: string = '';
    public limit: number = 30;
    public data: Video[] = [];
    public total: Number = 0;
    public current_page: number = 1;
    public activePage: string = '';
    public staticEndPoint: string = '';
    public AppSettings: any;
    public frontEndPoint;
    public searchFlag: boolean = false;
    public filterObj: any = {};
    public selectedPeriod: string = '';
    public selectedLength: number = 0;
    public selectedOrder: string = '';

    constructor(public  route: ActivatedRoute, public videoService: VideoService, /*public titleService: Title,*/
                public authService: AuthService,
                public creatorService: CreatorService,
                public router: Router,
                public userService: UserService,
                private readonly meta: MetaService) {
        // this.titleService.setTitle('النتائج');
    }

    ngOnInit() {
        this.AppSettings = AppSettings;
        this.staticEndPoint = AppSettings.getStaticEndpoint();
        this.frontEndPoint = AppSettings.getFrontEndpoint();
        this.route.queryParams.forEach(params => {
            this.searchFlag = false;
            this.selectedOrder = '';
            this.selectedLength = 0;
            this.selectedPeriod = '';
            this.current_page = 1;
            if (params['page'] == 'search') {
                this.searchFlag = true;
                this.pageName = 'البحث عن: ' + params['key'];
                this.searchKey = params['key'];
                this.search();
            } else if (params['page'] == 'more_views') {
                this.pageName = 'الأكثر مشاهدة';
                this.getMoreViews();
            } else if (params['page'] == 'category_views') {
                this.searchFlag = true;
                this.pageName = 'فيديوهات قسم: ' + params['key'];
                this.key_id = params['key_id'];
                this.getCategoryMoreViews();
            }
            else if (params['page'] == 'creator_views') {
                this.searchFlag = true;
                this.pageName = 'فيديوهات المبدع: ' + params['key'];
                this.key_id = params['key_id'];
                this.getCreatorMoreViews();
            }
            else if (params['page'] == 'tags') {
                this.searchFlag = true;
                this.pageName = 'فيديوهات وسم: ' + params['key'];
                this.key_id = params['key_id'];
                this.getTagsViews();
            }
            else if (params['page'] == 'watch_later') {
                this.pageName = 'مشاهدة لاحقا';
                this.getWatchLater();
            }
            this.activePage = params['page'];
        });

        // meta tags
        this.setMeta();
    }


    public search(filtered_obj ?: object) {
        var filter: any = '';
        if (filtered_obj && Object.keys(filtered_obj).length > 0) {
            filter = filtered_obj;
        }
        this.loading = true;
        this.videoService.getVideos(this.limit, '', '', filter, this.current_page, 2, this.searchKey).subscribe(data => {
            this.loading = false;
            this.data = data.data;
            this.total = data.total;
            this.error = '';
        }, err => {
            this.error = JSON.stringify(err.error);
            this.loading = false;
        })
    }

    public getMoreViews() {
        this.loading = true;
        this.videoService.getVideos(this.limit, 'views', 'desc', '', this.current_page, 2).subscribe(data => {
            this.loading = false;
            this.data = data.data;
            this.total = data.total;
            this.error = '';
        }, err => {
            this.error = JSON.stringify(err.error);
            this.loading = false;
        })
    }

    public getCategoryMoreViews() {
        this.loading = true;
        this.videoService.getVideos(this.limit, '', '', {'category_id': this.key_id}, this.current_page, 2).subscribe(data => {
            this.loading = false;
            this.data = data.data;
            this.total = data.total;
            this.error = '';
        }, err => {
            this.error = JSON.stringify(err.error);
            this.loading = false;
        })
    }

    private getWatchLater() {
        this.loading = true;
        this.videoService.getMyWatchedLater(this.current_page, this.limit, 2).subscribe(data => {
            this.loading = false;
            this.data = data.data;
            this.total = data.total;
            this.error = '';
        }, err => {
            this.error = JSON.stringify(err.error);
            this.loading = false;
        })
    }

    public getCreatorMoreViews() {
        this.loading = true;
        this.videoService.getVideos(this.limit, 'views', 'desc', {'creator_id': this.key_id}, this.current_page, 2).subscribe(data => {
            this.loading = false;
            this.data = data.data;
            this.total = data.total;
            this.error = '';
        }, err => {
            this.error = JSON.stringify(err.error);
            this.loading = false;
        })
    }

    public getTagsViews() {
        this.loading = true;
        this.videoService.getVideos(this.limit, '', '', {'tag_id': this.key_id}, this.current_page, 2).subscribe(data => {
            this.loading = false;
            this.data = data.data;
            this.total = data.total;
            this.error = '';
        }, err => {
            this.error = JSON.stringify(err.error);
            this.loading = false;
        })
    }

    public filter(obj) {
        var key = Object.keys(obj)[0];
        var value = obj[Object.keys(obj)[0]];
        var remove = false;
        if (key == 'upload_date') {
            if (this.selectedPeriod == value) {
                this.selectedPeriod = '';
                remove = true;
            } else {
                this.selectedPeriod = value;
            }
        }
        else if (key == 'length') {
            if (this.selectedLength == value) {
                this.selectedLength = 0;
                remove = true;
            } else {
                this.selectedLength = value;
            }
        }
        else if (key == 'order') {
            if (this.selectedOrder == value) {
                this.selectedOrder = '';
                remove = true;
            } else {
                this.selectedOrder = value;
            }
        }

        if (remove) {
            delete this.filterObj[key];
        } else {
            this.filterObj[key] = value;
        }

        switch (this.activePage) {
            case 'category_views':
                this.filterObj['category_id'] = this.key_id;
                break;
            case 'creator_views':
                this.filterObj['creator_id'] = this.key_id;
                break;
            case 'tags':
                this.filterObj['tag_id'] = this.key_id;
                break;
            default:
                break;
        }

        this.current_page = 1;
        this.search(this.filterObj);
    }

    public pageChanged(event) {
        this.current_page = event;
        switch (this.activePage) {
            case 'search':
                this.search();
                break;
            case 'more_views':
                this.getMoreViews();
                break;
            case 'category_views':
                this.getCategoryMoreViews();
                break;
            case 'creator_views':
                this.getCreatorMoreViews();
                break;
            case 'tags':
                this.getTagsViews();
                break;
            case 'watch_later':
                this.getWatchLater();
                break;
            default:
                break;
        }
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

    public likeVideo(video) {
        let id = video.id || video._id;
        if (this.authService.isAuthenticated()) {
            video.is_liked = !video.is_liked;
            if (video.counter) {
                video.is_liked ? video.counter.likes += 1 : video.counter.likes -= 1;
            } else if (video.counters) {
                video.is_liked ? video.counters.likes += 1 : video.counters.likes -= 1;
            }
            this.videoService.likeVideo(id).subscribe(data => {
            })
        } else {
            this.router.navigate(['login'])
        }
    }

    public addToWatchLater(video) {
        if (this.authService.isAuthenticated()) {
            video.is_watched = !video.is_watched;
            var id = video._id ? video._id : video.id;
            this.videoService.addToWatchLater(id).subscribe(data => {
                if (this.activePage == 'watch_later') {
                    this.pageChanged(1);
                }
            })
        } else {
            this.router.navigate(['login']);
        }
    }

    public getURL(video) {
        var id = video._id || video.id;
        return this.AppSettings.getShareEndpoint() + 'video/' + id;
    }

    public setMeta() {
        this.meta.setTitle('Piksels | ' + this.pageName);
        this.meta.setTag('description', 'Piksels | ' + this.pageName);
        this.meta.setTag('og:title', 'Piksels | ' + this.pageName);
        this.meta.setTag('og:description', 'Piksels | ' + this.pageName);
        this.meta.setTag('image', this.frontEndPoint + '/assets/images/x-logo.png');
        this.meta.setTag('og:image', this.frontEndPoint + '/assets/images/x-logo.png');
        this.meta.setTag('og:image:width', '781');
        this.meta.setTag('og:image:height', '289');
        this.meta.setTag('og:image:type', 'image/png');
        this.meta.setTag('og:url', this.frontEndPoint + this.router.url);
    }

}
