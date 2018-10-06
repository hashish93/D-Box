import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Video} from '../models/video.model';
import {VideoService} from '../services/video.service';
import {t} from '../../../node_modules/@angular/core/src/render3';
import {AppSettings} from '../app.settings';
import {Title} from '@angular/platform-browser';
import {AuthService} from '../services/auth-service.service';
import {CreatorService} from '../services/creator.service';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  public pageName : string = '';
  public searchKey : string = '';
  public key_id : number = 0;
  public loading : boolean = true;
  public error : string = '';
  public limit : number = 1;
  public data : Video[] = [];
  public total : Number = 0 ;
  public current_page: number = 1;
  public activePage : string = '';
  private staticEndPoint : string = '';

  constructor(public  route: ActivatedRoute,public videoService : VideoService,public titleService : Title ,
              public authService: AuthService,
              public creatorService: CreatorService ,
              public router: Router ,
              public userService: UserService){
    this.titleService.setTitle('النتائج');
  }

  ngOnInit() {
    this.staticEndPoint = AppSettings.getStaticEndpoint();
    this.route.queryParams.forEach(params => {
      this.current_page = 1;
      console.log(params);
      if(params['page']=='search'){
        this.pageName = 'البحث عن '+params['key'];
        this.searchKey =  params['key'];
        this.search();
      }else if(params['page']=='more_views'){
        this.pageName = 'الاكثر مشاهدة';
        this.getMoreViews();
      }else if(params['page']=='category_views'){
        this.pageName = 'فيديوهات قائمة '+params['key'];
        this.key_id = params['key_id'];
        this.getCategoryMoreViews();
      }
      else if(params['page']=='creator_views'){
        this.pageName = 'فيديوهات المبدع '+params['key'];
        this.key_id = params['key_id'];
        this.getCreatorMoreViews();
      }
      else if(params['page']=='tags'){
        this.pageName = 'وسم '+params['key'];
        this.key_id = params['key_id'];
        this.getTagsViews();
      }
      this.activePage = params['page'];
    });
  }


  public search(){
    this.loading = true;
    this.videoService.getVideos(this.limit,'','','', this.current_page,2, this.searchKey).subscribe(data=>{
      this.loading = false;
      this.data = data.data;
      this.total = data.total;
      this.error = '';
    },err=>{
      this.error = JSON.stringify(err.error);
      this.loading = false;
    })
  }

  public getMoreViews(){
    this.loading = true;
    this.videoService.getVideos(this.limit,'views','desc','', this.current_page,2).subscribe(data=>{
      this.loading = false;
      this.data = data.data;
      this.total = data.total;
      this.error = '';
    },err=>{
      this.error = JSON.stringify(err.error);
      this.loading = false;
    })
  }

  public getCategoryMoreViews(){
    this.loading = true;
    this.videoService.getVideos(this.limit,'','',{'category_id':this.key_id}, this.current_page,2).subscribe(data=>{
      this.loading = false;
      this.data = data.data;
      this.total = data.total;
      this.error = '';
    },err=>{
      this.error = JSON.stringify(err.error);
      this.loading = false;
    })
  }

  public getCreatorMoreViews(){
    this.loading = true;
    this.videoService.getVideos(this.limit,'views','desc',{'creator_id':this.key_id}, this.current_page,2).subscribe(data=>{
      this.loading = false;
      this.data = data.data;
      this.total = data.total;
      this.error = '';
    },err=>{
      this.error = JSON.stringify(err.error);
      this.loading = false;
    })
  }

  public getTagsViews(){
    this.loading = true;
    this.videoService.getVideos(this.limit,'','',{'tag_id':this.key_id}, this.current_page,2).subscribe(data=>{
      this.loading = false;
      this.data = data.data;
      this.total = data.total;
      this.error = '';
    },err=>{
      this.error = JSON.stringify(err.error);
      this.loading = false;
    })
  }

  public pageChanged(event){
    this.current_page = event;
    switch (this.activePage) {
      case 'search':
        this.search();
        break;
      case 'more_views':
        this.getMoreViews();
        break;
      case 'category_views':
        this.getCategoryMoreViews();
        break;
      case 'creator_views':
        this.getCreatorMoreViews();
        break;
      case 'tags':
        this.getTagsViews();
        break;
      default:
        break;
    }
  }

  public followCreator(video) {
    this.userService.getUserData().subscribe(data => {
      let user = data;
      if (user.id != video.creator.id) {
        if (this.authService.isAuthenticated()) {
          video.creator.is_followed = !video.creator.is_followed;
          this.creatorService.followCreator(video.creator.id).subscribe(data => {
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
