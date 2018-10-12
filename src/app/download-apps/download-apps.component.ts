import {Component, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-download-apps',
  templateUrl: './download-apps.component.html',
  styleUrls: ['./download-apps.component.scss']
})
export class DownloadAppsComponent implements OnInit {

  constructor(public cookieService: CookieService, public router: Router , private location : Location) {
  }


  ngOnInit(): void {
    const mobile_redirect = this.cookieService.get('mobile_redirect');
    if (mobile_redirect && mobile_redirect === 'false') {
      this.router.navigate(['']);
    }
  }

  public mobileRedirect(){
    const mobile_redirect = this.cookieService.get('mobile_redirect');
    if (mobile_redirect && mobile_redirect === 'true') {
      this.cookieService.set('mobile_redirect', 'false', 1);
      this.location.back();
    }
  }

}
