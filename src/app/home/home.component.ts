import {Component, OnInit} from '@angular/core';
// import {Title} from '@angular/platform-browser';
import {MetaService} from "@ngx-meta/core";
import {AppSettings} from "../app.settings";
import {Router} from "@angular/router";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public frontEndPoint;

    constructor(/*public titleService: Title, */private readonly meta: MetaService, public router: Router) {

    }

    ngOnInit() {
        this.frontEndPoint = AppSettings.getFrontEndpoint();

        // meta tags
        this.setMeta();
    }

    public setMeta() {
        this.meta.setTitle('Piksels | الرئيسية');
        this.meta.setTag('description', 'Piksels | الرئيسية');
        this.meta.setTag('og:title', 'Piksels | الرئيسية');
        this.meta.setTag('og:description', 'Piksels | الرئيسية');
        this.meta.setTag('image', this.frontEndPoint + '/assets/images/x-logo.png');
        this.meta.setTag('og:image', this.frontEndPoint + '/assets/images/x-logo.png');
        this.meta.setTag('og:image:width', '781');
        this.meta.setTag('og:image:height', '289');
        this.meta.setTag('og:image:type', 'image/png');
        this.meta.setTag('og:url', this.frontEndPoint /*+ this.router.url*/);
    }

}
