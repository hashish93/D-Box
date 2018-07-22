import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {VideoService} from "../../services/video.service";
import {Video} from "../../models/video.model";
import {NotificationsService} from "angular2-notifications";
import {AppSettings} from "../../app.settings";
import {CategoryService} from "../../services/category.service";
import {Category} from "../../models/category.model";

@Component({
  selector: 'app-edit-video',
  templateUrl: './edit-video.component.html',
  styleUrls: ['./edit-video.component.scss']
})
export class EditVideoComponent implements OnInit {
  public video : Video = {} as Video;
  public loading : boolean = false;
  public error : string = '';
  public file : any;
  public fileView : any = '';
  public staticEndPoint : string = '';
  public categories : Category[] = [];
  constructor(public route:ActivatedRoute,public router : Router,public videoService : VideoService,
              public notificationService : NotificationsService,public categoryService : CategoryService) { }

  ngOnInit() {
    this.staticEndPoint = AppSettings.getStaticEndpoint();
    this.route.params.forEach(params => {
      this.video.id = parseInt(params["id"]);
      if (this.video.id) {
        console.log(this.video.id)
        this.getCategories();
        this.getVideo();

      } else {
        this.router.navigate(['']);
      }
    });
  }

  public getCategories() {
    this.categoryService.getCategories().subscribe(data=>{
      this.categories = data;
    })
  }

  public getVideo() {
    this.loading=true;
    this.videoService.getVideo(this.video.id).subscribe(data=>{
      this.loading=false;
      this.error='';
      this.video = data;
      if(data.category){
        this.video.category_id = data.category.title;
      }
    },err=>{
      this.loading=false;
      this.error=JSON.stringify(err.error);
    })
  }

  public onFileChanged(event:any) {
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];
      var extn = this.file.name.split(".").pop();
      if (event.target.files[0].size / 1024 / 1024 > 3)
        this.notificationService.error("الحد الاقصى للصورة 3 ميجا بايت",'',{timeOut: 3000});
      if(extn == 'jpg' || extn == 'gif' || extn == 'png'){
        var reader = new FileReader();
        reader.onload = (event: ProgressEvent) => {
          this.fileView = (<FileReader>event.target).result;
        };

        reader.readAsDataURL(this.file);
      }
      else{
        this.notificationService.error('من فضلك اختار ملف من نوع صورة','',{timeOut: 3000})
      }

    }
  }

}
