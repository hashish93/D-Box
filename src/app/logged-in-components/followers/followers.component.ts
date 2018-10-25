import {Component, OnInit} from '@angular/core';
import {FollowerService} from "../../services/follower.service";
import {AppSettings} from "../../app.settings";
import {CreatorService} from '../../services/creator.service';
// import {Title} from '@angular/platform-browser';
import {MetaService} from "@ngx-meta/core";
import {Router} from "@angular/router";

@Component({
    selector: 'app-followers',
    templateUrl: './followers.component.html',
    styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {
    public current_page: number = 1;
    public limit: number = 12;
    public loading: boolean = false;
    public error: string = '';
    public data = [];
    public total: Number = 0;
    private staticEndPoint: string = '';
    public frontEndPoint;

    constructor(public followerService: FollowerService, /*public titleService : Title*/private readonly meta: MetaService, public router: Router) {
        // this.titleService.setTitle('المتابعين');
    }

    ngOnInit() {
        this.staticEndPoint = AppSettings.getStaticEndpoint();
        this.frontEndPoint = AppSettings.getFrontEndpoint();
        this.getFollowers();

        // meta tags
        this.setMeta();
    }

    public pageChanged(event) {
        this.current_page = event;
        this.getFollowers();
    }

    public unfollow(id) {
        this.followerService.unfollow(id).subscribe(data => {
            this.getFollowers();
        });
    }

    public getFollowers() {
        this.loading = true;
        this.followerService.getFollowers(this.current_page, this.limit, 2).subscribe(data => {
            this.data = data.data;
            this.total = data.total;
            this.loading = false;
            this.error = '';
        }, err => {
            this.error = JSON.stringify(err.error);
            this.loading = false;
        })
    }

    public setMeta() {
        this.meta.setTitle('Piksels | المتابعون');
        this.meta.setTag('description', 'Piksels | المتابعون');
        this.meta.setTag('og:title', 'Piksels | المتابعون');
        this.meta.setTag('og:description', 'Piksels | المتابعون');
        this.meta.setTag('image', this.frontEndPoint + '/assets/images/x-logo.png');
        this.meta.setTag('og:image', this.frontEndPoint + '/assets/images/x-logo.png');
        this.meta.setTag('og:image:width', '781');
        this.meta.setTag('og:image:height', '289');
        this.meta.setTag('og:image:type', 'image/png');
        this.meta.setTag('og:url', this.frontEndPoint + this.router.url);
    }

}
