import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public enable_cookie: any;

  constructor(public router: Router, public cookieService: CookieService) {
  }

  ngOnInit() {
    console.log(this.cookieService.get('enable_cookie'));
    this.enable_cookie = this.cookieService.get('enable_cookie');
    if (this.enable_cookie == null || this.enable_cookie == 'false')
      this.enable_cookie = false;
  }

  cookieClick(value) {
    this.cookieService.set('enable_cookie', value);
    this.enable_cookie = true;
  }
}
