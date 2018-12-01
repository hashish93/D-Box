import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../models/user.model";
import {TabsetComponent} from "ngx-bootstrap";
import {UserService} from "../../services/user.service";
import {Creator} from "../../models/creator.model";
import {Observable} from "rxjs";
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
// import {Title} from '@angular/platform-browser';
import {MetaService} from "@ngx-meta/core";
import {AppSettings} from "../../app.settings";

@Component({
    selector: 'app-settings',
    templateUrl: 'settings.component.html',
    styleUrls: ['settings.component.scss']
})
export class SettingsComponent implements OnInit {
    public selected: string = '';
    public tabs = ['favorites', 'followers', 'revenue', 'profile', 'statistics'];
    @ViewChild(TabsetComponent) tabset: TabsetComponent;
    public loading: boolean = false;
    public error: string = '';
    public user: Creator = {} as Creator;
    public frontEndPoint;

    constructor(public userService: UserService, public route: ActivatedRoute, public router: Router, public location: Location, /*public titleService: Title*/private readonly meta: MetaService) {
        // this.titleService.setTitle('الإعدادات');
    }

    ngOnInit() {
        this.frontEndPoint = AppSettings.getFrontEndpoint();

        this.route.queryParams.forEach((params: any) => {
            if (params && params.tab &&
                (params.tab == 'favorites' || params.tab == 'profile' || params.tab == 'followers'
                    || params.tab == 'revenue' || params.tab == 'upload' || params.tab == 'my-videos' || params.tab == 'statistics')) {
                this.selected = params.tab;
            } else {
                this.selected = 'favorites';
            }
        });

        this.getUserData();

        // meta tags
        this.setMeta();
    }

    public onSelect(event) {
        if (event && event.id) {
            this.selected = event.id;
            this.router.navigate(['/settings'], {queryParams: {tab: event.id}})
        }
    }

    private getUserData() {
        this.loading = true;
        this.userService.getUserData().subscribe(data => {
            this.loading = false;
            this.user = data;
        }, err => {
            this.loading = false;
            this.error = JSON.stringify(err.error);
        })
    }

    public setMeta() {
        this.meta.setTitle('Piksels | الإعدادات');
        this.meta.setTag('description', 'Piksels | الإعدادات');
        this.meta.setTag('og:title', 'Piksels | الإعدادات');
        this.meta.setTag('og:description', 'Piksels | الإعدادات');
        this.meta.setTag('image', this.frontEndPoint + '/assets/images/x-logo.png');
        this.meta.setTag('og:image', this.frontEndPoint + '/assets/images/x-logo.png');
        this.meta.setTag('og:image:width', '781');
        this.meta.setTag('og:image:height', '289');
        this.meta.setTag('og:image:type', 'image/png');
        this.meta.setTag('og:url', this.frontEndPoint + this.router.url);
    }
}
