import { Component, OnInit } from '@angular/core';
import {CreatorService} from "../../services/creator.service";
import {UserService} from "../../services/user.service";
declare var google: any;

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  public loading : boolean = false;
  public error : string = '';
  public month   = new Date().getMonth()+1;
  public year= new Date().getFullYear();
  public data : any;
  public countryList : any = [];
  public highestCountry : number = 0;
  public deviceList : any = [];
  public totalDeviceVisitors: number = 0;
  public deviceColorScheme = { domain: ['#4fbd83', '#1b81d8', '#d00c8d'] };
  public weeksColorScheme = {domain:['#6deef6']};
  public daysList : any[] = [];
  public weeksList : any = [
    {
      "name": "Burkina Faso",
      "series": [
        {
          "value": 2460,
          "name": "2016-09-14T22:19:31.185Z"
        },
        {
          "value": 3100,
          "name": "2016-09-13T15:51:43.224Z"
        },
        {
          "value": 3430,
          "name": "2016-09-18T06:53:08.949Z"
        },
        {
          "value": 2259,
          "name": "2016-09-14T18:14:03.082Z"
        },
        {
          "value": 2504,
          "name": "2016-09-21T02:59:01.086Z"
        }
      ]
    },
    {
      "name": "Colombia",
      "series": [
        {
          "value": 4771,
          "name": "2016-09-14T22:19:31.185Z"
        },
        {
          "value": 5780,
          "name": "2016-09-13T15:51:43.224Z"
        },
        {
          "value": 2427,
          "name": "2016-09-18T06:53:08.949Z"
        },
        {
          "value": 5108,
          "name": "2016-09-14T18:14:03.082Z"
        },
        {
          "value": 6983,
          "name": "2016-09-21T02:59:01.086Z"
        }
      ]
    },
    {
      "name": "Virgin Islands, U.S.",
      "series": [
        {
          "value": 6559,
          "name": "2016-09-14T22:19:31.185Z"
        },
        {
          "value": 2437,
          "name": "2016-09-13T15:51:43.224Z"
        },
        {
          "value": 6064,
          "name": "2016-09-18T06:53:08.949Z"
        },
        {
          "value": 5631,
          "name": "2016-09-14T18:14:03.082Z"
        },
        {
          "value": 3045,
          "name": "2016-09-21T02:59:01.086Z"
        }
      ]
    },
    {
      "name": "Canada",
      "series": [
        {
          "value": 4789,
          "name": "2016-09-14T22:19:31.185Z"
        },
        {
          "value": 6336,
          "name": "2016-09-13T15:51:43.224Z"
        },
        {
          "value": 4776,
          "name": "2016-09-18T06:53:08.949Z"
        },
        {
          "value": 5979,
          "name": "2016-09-14T18:14:03.082Z"
        },
        {
          "value": 2827,
          "name": "2016-09-21T02:59:01.086Z"
        }
      ]
    },
    {
      "name": "Gabon",
      "series": [
        {
          "value": 3007,
          "name": "2016-09-14T22:19:31.185Z"
        },
        {
          "value": 2432,
          "name": "2016-09-13T15:51:43.224Z"
        },
        {
          "value": 3613,
          "name": "2016-09-18T06:53:08.949Z"
        },
        {
          "value": 6905,
          "name": "2016-09-14T18:14:03.082Z"
        },
        {
          "value": 4658,
          "name": "2016-09-21T02:59:01.086Z"
        }
      ]
    }
  ]
  constructor(public creatorService : CreatorService,public userService : UserService) { }

  ngOnInit() {
    this.getStatistics();
  }

  public getStatistics() {
    this.loading = true;
    this.error = '';
    this.userService.getStatistics(this.month, this.year).subscribe(data=>{
      this.loading = false;
      this.data = data;
      this.loadMap(this.data);
      this.loadCountryList(this.data);
      this.loadDeviceList(this.data);
      this.loadDaysList(this.data);
      console.log(this.data)
    },err=>{
      this.loading = false;
      this.error = JSON.stringify(err.error);
    })
  }

  public fetChCountryData(data){
    var countries = data.countries;
    var result = [];
    var obj = ['Country', 'Number of views'];
    result.push(obj);
    for(var country of countries){
      obj = [country['english_name'] , country['views']]
      result.push(obj);
    }
    return result;
  }
  public loadMap(data){
    var result = this.fetChCountryData(data);
    google.charts.load('current', {
      'packages':['geochart'],
      // Note: you will need to get a mapsApiKey for your project.
      // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
      'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
    });

    google.charts.setOnLoadCallback(drawRegionsMap);

    function drawRegionsMap() {
      var data = google.visualization.arrayToDataTable(result);

      var options = {
        colorAxis: {colors: ['#36569f','#36569f','#36569f','#36569f']},
        backgroundColor: '#1f2840',
        datalessRegionColor: '#737b8e',
        defaultColor: 'yellow',

      };
      console.log('here');
      console.log(document.getElementById('regions_div'));
      var chart = new google.visualization.GeoChart(<HTMLInputElement>document.getElementById('regions_div'));

      chart.draw(data, options);
    }
  }

  private loadCountryList(data: any) {
    this.countryList = [];
    var countries = data.countries;
    var result = [];
    for(var country of countries){
      var obj = {name : country['english_name'],value : country['views'],name_ar:country['arabic_name']};
      result.push(obj);
      if(country['views'] > this.highestCountry){
        this.highestCountry = country['views']
      }
    }
    this.countryList = result;
  }

  private loadDeviceList(data: any) {
    this.deviceList = [];
    var devices = data.devices;
    var result = [];
    for(var device of devices){
      this.totalDeviceVisitors +=device['views'];
      var obj = {name : device['device_type'], value : device['views']};
      result.push(obj);
    }
    this.deviceList = result;
  }

  private loadDaysList(data: any) {
    this.daysList = [];
    var days = data.days;
    var result = [];
    for(var day of days){
      var obj = {name : day['day'], value : day['views']};
      result.push(obj);
    }
    this.daysList = result;
  }
}
