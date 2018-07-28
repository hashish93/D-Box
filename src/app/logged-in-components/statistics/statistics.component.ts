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
  public colorScheme = { domain: ['#36569f', '#909ab0', '#5472b5', '#8ed0ad'] };

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
      this.loadCountryList(this.data)
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
      var obj = {name : country['english_name'],value : country['views']};
      result.push(obj);
    }
    this.countryList = result;
  }
}
