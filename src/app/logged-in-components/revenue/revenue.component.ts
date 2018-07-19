import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../services/user.service";
import {AppSettings} from "../../app.settings";
import {Revenue} from "../../models/revenue.model";
import {Options} from "fullcalendar";
import {CalendarComponent} from "ng-fullcalendar";

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.scss']
})
export class RevenueComponent implements OnInit {
  public loading : boolean = false;
  public first : boolean = true;
  public error : string = '';
  public revenue : Revenue = {} as Revenue;
  public month   = new Date().getMonth()+1;
  public year= new Date().getFullYear();
  public staticEndPoint : string = '';

  calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  public events = [];




  constructor(public userService : UserService) { }

  ngOnInit() {
    this.staticEndPoint = AppSettings.getStaticEndpoint();
    console.log(this.year);
    console.log(this.month);
    this.getRevenue();
    this.initCalendarOptions();
  }

  private getRevenue() {
    if(this.first){
      this.loading = true;
      this.first = false;
    }
    // this.ucCalendar.rer
    this.calendarOptions = null;

    this.userService.getRevenue(this.month,this.year).subscribe(data=>{
      this.revenue = data;
      console.log(this.revenue.revenues);
      this.initCalendarOptions(this.mapDataToCalendar(this.revenue.revenues));
      // if(this.ucCalendar)
      //   this.ucCalendar.renderEvents(this.mapDataToCalendar(this.revenue.revenues));
      this.loading = false;
      this.error = '';
    },err=>{
      this.loading = false;
      this.error = JSON.stringify(err.error);
    })
  }

  public mapDataToCalendar(data){
    let result = [];
    let item : any;
    for(item of data){
      let obj = {title:'',start:''};
      obj.title = item.total;
      obj.start = item.date;
      result.push(obj);
    }
    console.log(result)
    return result;
  }

  public clickButton(model: any) {
    let dateString : string = '';
    dateString = model.data._d;
    this.year = new Date(dateString).getUTCFullYear();
    this.month = new Date(dateString).getUTCMonth() + 1;
    console.log(this.year);
    console.log(this.month);
    this.getRevenue();
  }


  private initCalendarOptions(data?) {
    this.calendarOptions = {
      editable: false,
      eventLimit: false,
      lazyFetching:true,
      header: {
        left: 'prev',
        center: 'title',
        right: 'next'
      },
      locale: 'ar',
      events : data,
      selectable: true,
    };
  }
}
