import {Component, OnInit} from '@angular/core';
import {CreatorService} from "../../services/creator.service";
import {UserService} from "../../services/user.service";
import * as d3 from "d3";
import * as shape from 'd3-shape';
import {Router} from '@angular/router';
// import {Title} from '@angular/platform-browser';
import {MetaService} from "@ngx-meta/core"
import {AppSettings} from "../../app.settings";

declare var google: any;

@Component({
    selector: 'app-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
    public loading: boolean = false;
    public error: string = '';
    public month = new Date().getMonth() + 1;
    public year = new Date().getFullYear();
    public data: any;
    public countryList: any = [];
    public highestCountry: number = 0;
    public deviceList: any = [];
    public totalDeviceVisitors: number = 0;
    public deviceColorScheme = {domain: ['#4fbd83', '#1b81d8', '#d00c8d']};
    public weeksColorScheme = {domain: ['#6deef6']};
    public daysList: any[] = [];
    public monthList: any = [
        {
            "name": "معدلات الزيارة",
            "series": []
        }
    ];

    public curve = shape.curveBasisClosed;
    public frontEndPoint;


    constructor(public creatorService: CreatorService, public userService: UserService, /*public titleService: Title*/public router: Router, private readonly meta: MetaService) {
        // this.titleService.setTitle('الاحصائيات');
    }

    ngOnInit() {
        this.frontEndPoint = AppSettings.getFrontEndpoint();
        this.getStatistics();

        // meta tags
        this.setMeta();
    }

    public getStatistics() {
        this.loading = true;
        this.error = '';
        this.userService.getStatistics(this.month, this.year).subscribe(data => {
            this.loading = false;
            this.data = data;
            this.loadMap(this.data);
            this.loadCountryList(this.data);
            this.loadDeviceList(this.data);
            this.loadDaysList(this.data);
            this.loadMonthsList(this.data);
        }, err => {
            this.loading = false;
            this.error = JSON.stringify(err.error);
        })
    }

    public fetChCountryData(data) {
        var countries = data.countries;
        var result = [];
        var obj = ['Country', 'عدد المشاهدات'];
        result.push(obj);
        for (var country of countries) {
            obj = [country['arabic_name'], country['views']]
            result.push(obj);
        }
        return result;
    }

    public loadMap(data) {
        var result = this.fetChCountryData(data);
        google.charts.load('current', {
            'packages': ['geochart'],
            // Note: you will need to get a mapsApiKey for your project.
            // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
            'mapsApiKey': 'AIzaSyAm_an6zerWBDs_OY0qpIXE33OIzB99A-g'
        });

        google.charts.setOnLoadCallback(drawRegionsMap);

        function drawRegionsMap() {
            var data = google.visualization.arrayToDataTable(result);

            var options = {
                colorAxis: {colors: ['#36569f', '#36569f', '#36569f', '#36569f']},
                backgroundColor: '#1f2840',
                datalessRegionColor: '#737b8e',
                defaultColor: 'yellow',

            };
            var chart = new google.visualization.GeoChart(<HTMLInputElement>document.getElementById('regions_div'));

            chart.draw(data, options);
        }
    }

    private loadCountryList(data: any) {
        this.countryList = [];
        var countries = data.countries;
        var result = [];
        for (var country of countries) {
            var obj = {name: country['english_name'], value: country['views'], name_ar: country['arabic_name']};
            result.push(obj);
            if (country['views'] > this.highestCountry) {
                this.highestCountry = country['views']
            }
        }
        this.countryList = result;
    }

    private loadDeviceList(data: any) {
        this.deviceList = [];
        var devices = data.devices;
        var result = [];
        for (var device of devices) {
            this.totalDeviceVisitors += device['views'];
            var obj = {name: device['device_type'], value: device['views']};
            result.push(obj);
        }
        this.deviceList = result;
    }

    private loadDaysList(data: any) {
        this.daysList = [];
        var days = data.days;
        var result = [];
        for (var day of days) {
            var obj = {name: day['day'], value: day['views']};
            result.push(obj);
        }
        this.daysList = result;
    }

    private loadMonthsList(data: any) {
        this.monthList = [
            {
                "name": "معدلات الزيارة",
                "series": []
            }
        ];
        var months = data.monthes;
        var result = [];
        for (var month of months) {
            var obj = {name: month['month'], value: month['views']};
            result.push(obj);
        }
        this.monthList[0].series = result;
    }

    public setMeta() {
        this.meta.setTitle('Piksels | الاحصائيات');
        this.meta.setTag('description', 'Piksels | الاحصائيات');
        this.meta.setTag('og:title', 'Piksels | الاحصائيات');
        this.meta.setTag('og:description', 'Piksels | الاحصائيات');
        this.meta.setTag('image', this.frontEndPoint + '/assets/images/x-logo.png');
        this.meta.setTag('og:image', this.frontEndPoint + '/assets/images/x-logo.png');
        this.meta.setTag('og:image:width', '781');
        this.meta.setTag('og:image:height', '289');
        this.meta.setTag('og:image:type', 'image/png');
        this.meta.setTag('og:url', this.frontEndPoint + this.router.url);
    }
}
