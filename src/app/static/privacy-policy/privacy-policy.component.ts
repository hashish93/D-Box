import {Component, OnInit} from '@angular/core';
import {MetaService} from "@ngx-meta/core";
import {AppSettings} from "../../app.settings";

@Component({
    selector: 'app-privacy-policy',
    templateUrl: './privacy-policy.component.html',
    styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {
    public frontEndPoint;

    constructor(private readonly meta: MetaService) {
    }

    ngOnInit() {
        this.frontEndPoint = AppSettings.getFrontEndpoint();

        // meta tags
        this.setMeta();
    }

    public setMeta() {
        this.meta.setTitle('Piksels | Privacy Policy');
        this.meta.setTag('description', 'Piksels | Privacy Policy');
        this.meta.setTag('og:title', 'Piksels | Privacy Policy');
        this.meta.setTag('og:description', 'Piksels | Privacy Policy');
        this.meta.setTag('image', this.frontEndPoint + '/assets/images/x-logo.png');
        this.meta.setTag('og:image', this.frontEndPoint + '/assets/images/x-logo.png');
        this.meta.setTag('og:image:width', '781');
        this.meta.setTag('og:image:height', '289');
        this.meta.setTag('og:image:type', 'image/png');
        this.meta.setTag('og:url', this.frontEndPoint /*+ this.router.url*/);
    }

}
