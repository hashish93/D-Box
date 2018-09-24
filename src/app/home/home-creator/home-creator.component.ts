import { Component, OnInit } from '@angular/core';
import {Creator} from "../../models/creator.model";
import {CreatorService} from "../../services/creator.service";
import {AppSettings} from "../../app.settings";
import {PlaylistService} from '../../services/playlist.service';
import {AuthService} from '../../services/auth-service.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-home-creator',
  templateUrl: 'home-creator.component.html',
  styleUrls: ['home-creator.component.scss']
})
export class HomeCreatorComponent implements OnInit {
  public staticEndPoint: string = "";
  public loading : boolean = false;
  public error : string = '';
  public creators : Creator[];
  constructor(public authService: AuthService,
              public creatorService: CreatorService ,
              public router: Router ,
              public userService: UserService) { }

  ngOnInit() {
    this.staticEndPoint = AppSettings.getStaticEndpoint();
    this.getCreatorLimited()
  }

  public getCreatorLimited(){
    this.loading = true;
    this.error = '';
    this.creators = [];
    this.creatorService.getCreators(4).subscribe(data=> {
      this.creators = data;
      this.loading = false;
      this.error = '';
    },error=>{
      this.loading = false;
      this.error = 'خطأ في تحميل القائمة الخاصة بالمبدعون'
    })
  }

  public followCreator(creator) {
    this.userService.getUserData().subscribe(data => {
      let user = data;
      if (user.id != creator._id) {
        if (this.authService.isAuthenticated()) {
          creator.is_followed = !creator.is_followed;
          this.creatorService.followCreator(creator._id).subscribe(data => {
          })
        } else {
          this.router.navigate(['login']);
        }
      }
    },err=>{
      this.router.navigate(['login']);
    });
  }

}
