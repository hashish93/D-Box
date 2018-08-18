import { Component, OnInit } from '@angular/core';
import {FollowerService} from "../../services/follower.service";
import {AppSettings} from "../../app.settings";
import {CreatorService} from '../../services/creator.service';
import {Title} from '@angular/platform-browser';

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
  constructor(public followerService : FollowerService,public titleService : Title) {
    this.titleService.setTitle('المتابعين');
  }
  ngOnInit() {
    this.staticEndPoint = AppSettings.getStaticEndpoint();
    this.getFollowers()
  }

  public pageChanged(event){
    this.current_page = event;
    this.getFollowers();
  }

  public unfollow(id){
      this.followerService.unfollow(id).subscribe(data=>{
        this.getFollowers();
      });
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
