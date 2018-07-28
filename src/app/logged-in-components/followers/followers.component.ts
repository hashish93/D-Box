import { Component, OnInit } from '@angular/core';
import {FollowerService} from "../../services/follower.service";
import {AppSettings} from "../../app.settings";

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {
  public current_page: number = 1;
  public limit : number = 12;
  public loading : boolean = false;
  public error : string = '';
  public data= [];
  public total : Number = 0 ;
  private staticEndPoint : string = '';
  constructor(public followerService : FollowerService) { }

  ngOnInit() {
    this.staticEndPoint = AppSettings.getStaticEndpoint();
    this.getFollowers()
  }

  public pageChanged(event){
    this.current_page = event;
    this.getFollowers();
  }

  public unfollow(id){
      this.followerService.unfollow(id).subscribe()
      this.data.forEach((item,i)=>{
        // if(item.id == id){
        //   this.data.splice(i, 1);
        //   return
        // }
        this.getFollowers();
    })
  }

  public getFollowers() {
    this.loading = true;
    this.followerService.getFollowers(this.current_page , this.limit , 2).subscribe(data=>{
      this.data = data.data;
      this.total = data.total;
      this.loading = false;
      this.error = '';
    },err=>{
      this.error = JSON.stringify(err.error);
      this.loading = false;
    })
  }

}
