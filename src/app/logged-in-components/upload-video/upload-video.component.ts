import { Component, OnInit } from '@angular/core';
import {Video} from "../../models/video.model";

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.scss']
})
export class UploadVideoComponent implements OnInit {
  public video : Video = {} as Video;
  constructor() { }

  ngOnInit() {
  }

}
