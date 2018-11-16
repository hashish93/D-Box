import {Component, OnInit} from '@angular/core';
import {Category} from "../models/category.model";
import {AppSettings} from "../app.settings";
import {CategoryService} from "../services/category.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {VideoService} from "../services/video.service";
import {Video} from "../models/video.model";
// import {Title} from '@angular/platform-browser';
import {AuthService} from '../services/auth-service.service';
import {CreatorService} from '../services/creator.service';
import {UserService} from '../services/user.service';
import {MetaService} from "@ngx-meta/core";

@Component({
    selector: 'app-category-details',
    templateUrl: './category-details.component.html',
    styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {
    public loading: boolean = true;
    public error: string;
    public category: Category = {} as Category;
    public videos: Video[] = [];
    public firstVideo: Video;
    public staticEndPoint;
    public AppSettings: any;
    public frontEndPoint;

    constructor(public categoryService: CategoryService, public route: ActivatedRoute
        , public router: Router, public videoService: VideoService, /*public titleService : Title,*/
                public authService: AuthService,
                public creatorService: CreatorService,
                public userService: UserService,
                private readonly meta: MetaService) {
        // this.titleService.setTitle('القسم');
    }

    ngOnInit() {
        this.route.params.forEach(params => {
            this.getCategoryDetails(params["id"]);
        });
        this.AppSettings = AppSettings;
        this.staticEndPoint = AppSettings.getStaticEndpoint();
        this.frontEndPoint = AppSettings.getFrontEndpoint();
    }

    getCategoryDetails(id) {
        this.category.id = parseInt(id);
        this.getCategory(this.category.id);
        this.getCategoryVideos(this.category.id);
    }

    public getCategory(id: Number) {
        this.loading = true;
        this.categoryService.getCategory(id).subscribe(data => {
            this.loading = false;
            this.category = data;
            // meta tags
            this.setMeta();
        }, err => {
            this.loading = false;
            this.error = JSON.stringify(err.error);
        })
    }

    public getCategoryVideos(id: Number) {
        this.loading = true;
        this.firstVideo = null;
        this.videoService.getVideos(7, null, null, {category_id: id}).subscribe(data => {
            this.loading = false;
            this.videos = data;
            if (this.videos && this.videos.length > 0) {
                this.firstVideo = this.videos[0];
                this.videos = this.videos.splice(1);
            }

        }, err => {
            this.loading = false;
            this.error = JSON.stringify(err.error);
        })
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
            video.is_liked ? video.counter.likes += 1 : video.counter.likes -= 1;
            this.videoService.likeVideo(id).subscribe(data => {
            })
        } else {
            this.router.navigate(['login'])
        }
    }

  public addToWatchLater(video){
    if (this.authService.isAuthenticated()) {
      video.is_watched = !video.is_watched;
      var id = video._id ? video._id : video.id;
      this.videoService.addToWatchLater(id).subscribe(data => {
      })
    } else {
      this.router.navigate(['login']);
    }
  }

    public setMeta() {
        this.meta.setTitle('Piksels | ' + this.category.title);
        this.meta.setTag('description', 'Piksels | ' + this.category.title);
        this.meta.setTag('og:title', 'Piksels | ' + this.category.title);
        this.meta.setTag('og:description', 'Piksels | ' + this.category.title);
        this.meta.setTag('image', this.frontEndPoint + '/assets/images/x-logo.png');
        this.meta.setTag('og:image', this.frontEndPoint + '/assets/images/x-logo.png');
        this.meta.setTag('og:image:width', '781');
        this.meta.setTag('og:image:height', '289');
        this.meta.setTag('og:image:type', 'image/png');
        this.meta.setTag('og:url', this.frontEndPoint + this.router.url);
    }
}
