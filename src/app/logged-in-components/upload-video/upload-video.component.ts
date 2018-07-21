import { Component, OnInit } from '@angular/core';
import {Video} from "../../models/video.model";
import {VideoService} from "../../services/video.service";
import {Observable} from "rxjs";
import {NotificationsService} from "angular2-notifications";
import {DomSanitizer} from '@angular/platform-browser';
import {CategoryService} from "../../services/category.service";
import {Category} from "../../models/category.model";
import {Router} from "@angular/router";


@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.scss']
})
export class UploadVideoComponent implements OnInit {
  public video: Video = {} as Video;
  public fileView : any = '';
  public categories = [];
  public loading : boolean = false;
  public error : string = '';


  constructor(public videoService: VideoService,
              public notificationService: NotificationsService , private sanitizer:DomSanitizer,
              public categoryService : CategoryService, public router : Router) {
  }

  ngOnInit() {
    this.getCategories();
  }

  public AutocompleteTags = (text: string): Observable<any> => {
    return this.videoService.getTags(text);
  };

  public onItemAdded(event: any) {
    this.video.tags.splice(this.video.tags.indexOf(event.value), 1);
    this.video.tags.push(event.value)
  }

  public onFileChanged(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.video.file = event.target.files[0];
      var extn = this.video.file.name.split(".").pop();
      console.log(this.video.file);
      console.log(extn.ignoreCase);
      if (event.target.files[0].size / 1024 / 1024 > 1024)
        this.notificationService.error("الحد الاقصى للصورة 1 جيجا بايت", '', {timeOut: 3000});
      if (extn.toLowerCase() == 'mp4' || extn.toLowerCase() == 'avi' ||
        extn.toLowerCase() == 'flv' || extn.toLowerCase() == 'mov' ||
        extn.toLowerCase() == 'flv' || extn.toLowerCase() == 'wmv' ||
        extn.toLowerCase() == 'wmv') {
        console.log(true);
        var reader = new FileReader();
        reader.onload = (event: ProgressEvent) => {
          this.fileView = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.video.file));
        };

        reader.readAsDataURL(this.video.file);
      }
      else {
        this.notificationService.error('من فضلك اختار ملف من نوع صورة', '', {timeOut: 3000})
      }
    }
  }

  public submit(videoForm){
    this.loading = true;
    this.videoService.postVideo(this.video).subscribe(data=>{
      this.loading = false;
      this.notificationService.success("تم رفع الفيديو بنجاح", '', {timeOut: 3000})
      this.router.navigate(['/']);
    },err=>{
      this.loading = false;
      // this.error = JSON.stringify(err.error);
      this.error = JSON.stringify(err.error);
    })
  }

  private getCategories() {
    this.categoryService.getCategories().subscribe(data=>{
      this.categories = data;
    })
  }
}
