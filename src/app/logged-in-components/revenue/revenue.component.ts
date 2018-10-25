import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../services/user.service";
import {AppSettings} from "../../app.settings";
import {Revenue} from "../../models/revenue.model";
import {Options} from "fullcalendar";
import {CalendarComponent} from "ng-fullcalendar";
import {Router} from '@angular/router';
// import {Title} from '@angular/platform-browser';
import {MetaService} from "@ngx-meta/core";

@Component({
    selector: 'app-revenue',
    templateUrl: './revenue.component.html',
    styleUrls: ['./revenue.component.scss']
})
export class RevenueComponent implements OnInit {
    public loading: boolean = false;
    public first: boolean = true;
    public error: string = '';
    public revenue: Revenue = {} as Revenue;
    public month = new Date().getMonth() + 1;
    public year = new Date().getFullYear();
    public staticEndPoint: string = '';
    public frontEndPoint;

    calendarOptions: Options;
    @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
    public events = [];


    constructor(public userService: UserService, public router: Router, /*public titleService: Title*/private readonly meta: MetaService) {
        // this.titleService.setTitle('الأرباح');
    }

    ngOnInit() {
        this.staticEndPoint = AppSettings.getStaticEndpoint();
        this.frontEndPoint = AppSettings.getFrontEndpoint();
        this.getRevenue();
        this.initCalendarOptions();

        // meta tags
        this.setMeta();
    }

    private getRevenue() {
        this.loading = true;
        this.userService.getRevenue(this.month, this.year).subscribe(data => {
            this.revenue = data;
            this.initCalendarOptions(this.mapDataToCalendar(this.revenue.revenues));
            this.loading = false;
            this.error = '';
            if (this.first) {
                this.first = false;
            }
        }, err => {
            if (this.first) {
                this.first = false;
            }
            this.loading = false;
            this.error = JSON.stringify(err.error);
        })
    }

    public mapDataToCalendar(data) {
        let result = [];
        let item: any;
        for (item of data) {
            let obj = {title: '', start: ''};
            obj.title = item.total;
            obj.start = item.date;

            result.push(obj);
        }
        return result;
    }

    public clickButton(model: any) {
        let dateString: string = '';
        dateString = model.data._d;
        this.year = new Date(dateString).getUTCFullYear();
        this.month = new Date(dateString).getUTCMonth() + 1;
        this.getRevenue();
    }


    private initCalendarOptions(data?) {
        this.calendarOptions = {
            editable: false,
            defaultDate: new Date(this.year, this.month - 1),
            eventLimit: false,
            header: {
                left: 'prev',
                center: 'title',
                right: 'next'
            },
            locale: 'ar',
            events: data,
            selectable: true,
        };
    }

    public setMeta() {
        this.meta.setTitle('Piksels | الأرباح');
        this.meta.setTag('description', 'Piksels | الأرباح');
        this.meta.setTag('og:title', 'Piksels | الأرباح');
        this.meta.setTag('og:description', 'Piksels | الأرباح');
        this.meta.setTag('image', this.frontEndPoint + '/assets/images/x-logo.png');
        this.meta.setTag('og:image', this.frontEndPoint + '/assets/images/x-logo.png');
        this.meta.setTag('og:image:width', '781');
        this.meta.setTag('og:image:height', '289');
        this.meta.setTag('og:image:type', 'image/png');
        this.meta.setTag('og:url', this.frontEndPoint + this.router.url);
    }
}
