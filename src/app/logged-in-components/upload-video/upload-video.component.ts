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

  public loaded = 0;
  public step = 1048576 / 1024//1024*1024; size of one chunk
  public total = 0;  // total size of file
  public start = 0;          // starting position


  constructor(public videoService: VideoService,
              public notificationService: NotificationsService , private sanitizer:DomSanitizer,
              public categoryService : CategoryService, public router : Router) {
  }

  ngOnInit() {
    this.video.num = 1;
    this.video.num_chunks = Math.floor(this.total / this.step);
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
      if (event.target.files[0].size / 1024 / 1024 > 1024)
        this.notificationService.error("الحد الاقصى للصورة 1 جيجا بايت", '', {timeOut: 3000});
      if (extn.toLowerCase() == 'mp4' || extn.toLowerCase() == 'avi' ||
        extn.toLowerCase() == 'flv' || extn.toLowerCase() == 'mov' ||
        extn.toLowerCase() == 'flv' || extn.toLowerCase() == 'wmv' ||
        extn.toLowerCase() == 'wmv') {
        var reader = new FileReader();
        reader.onload = (event: ProgressEvent) => {
          this.fileView = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(this.video.file));
        };

        reader.readAsDataURL(this.video.file);
        this.loaded = 0;
        this.step = 1048576//1024*1024; size of one chunk
        this.total = this.video.file.size;  // total size of file
        this.start = 0;          // starting position
        this.video.blob = this.video.file.slice(this.start, this.step); //a single chunk in starting of step size
        this.video.num = 1;
        this.video.num_chunks = Math.floor(this.total / this.step) + 1;
      }
      else {
        this.notificationService.error('من فضلك اختار ملف من نوع صورة', '', {timeOut: 3000})
      }
    }
  }

  public submit(videoForm){
    if(this.video.file.size / 1024 / 1024 > 1)
      this.uploadVideoWithChunks();
    else
      this.uploadVideo();
  }

  public uploadVideoWithChunks() {

    this.loading = true;
    let video = this.video;
    this.videoService.postVideo(video)
      .subscribe(data=> {
      this.loaded += this.step;                 //increasing loaded which is being used as start position for next chunk
      this.video.num+=1;
      if(this.loaded <= this.total){            // if file is not completely uploaded
        this.video.blob = this.video.file.slice(this.loaded,this.loaded+this.step);  // getting next chunk
        this.uploadVideoWithChunks();
      } else {                       // if file is uploaded completely
        this.loaded = this.total;            // just changed loaded which could be used to show status.
        this.loading = false;
        this.error ='';
        this.notificationService.success("تم رفع الفيديو بنجاح", '', {timeOut: 3000});
        this.router.navigate(['/']);
      }

    }, err=> {
      this.loading = false;
      this.error = JSON.stringify(err.error);
    })

  }


  private uploadVideo() {
    this.loading = true;
    this.videoService.postVideo(this.video).subscribe(data=> {
      this.loading = false;
      this.notificationService.success("تم رفع الفيديو بنجاح", '', {timeOut: 3000})
      this.router.navigate(['/']);
    }, err=> {
      this.loading = false;
      // this.error = JSON.stringify(err.error);
      this.error = JSON.stringify(err.error);
    })
  }

  public getCategories() {
    this.categoryService.getCategories().subscribe(data=>{
      this.categories = data;
    })
  }
}
