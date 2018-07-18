import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {AppSettings} from "../../app.settings";
import {Revenue} from "../../models/revenue.model";

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.scss']
})
export class RevenueComponent implements OnInit {
  public loading : boolean = false;
  public error : string = '';
  public revenue : Revenue = {} as Revenue;
  public month   = new Date().getMonth()+1;
  public year= new Date().getFullYear();
  private staticEndPoint : string = '';
  constructor(public userService : UserService) { }

  ngOnInit() {
    this.staticEndPoint = AppSettings.getStaticEndpoint();
    console.log(this.year);
    console.log(this.month);
    this.getRevenue()
  }

  private getRevenue() {
    this.loading = true;
    this.userService.getRevenue(this.month,this.year).subscribe(data=>{
      this.revenue = data;
      console.log(this.revenue);
      this.loading = false;
      this.error = '';
    },err=>{
      this.loading = false;
      this.error = JSON.stringify(err.error);
    })
  }
}
