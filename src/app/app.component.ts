import {Component, HostListener, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {NavigationEnd, Router} from '@angular/router';
import {MessagingService} from './shared/messaging.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public message;


  constructor( public cookieService: CookieService , public router: Router , private messagingService: MessagingService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        (<any>window).ga('set', 'page', event.urlAfterRedirects);
        (<any>window).ga('send', 'pageview');
      }
    });
  }


  ngOnInit(): void {
    const mobile_redirect = this.cookieService.get('mobile_redirect');
    var ua = navigator.userAgent;
    if(mobile_redirect !== 'false' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)){
      this.cookieService.set( 'mobile_redirect', 'true',1 );
      this.router.navigate(['/download-apps']);
    }
    const userId = 'user001';
    this.messagingService.requestPermission(userId);
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
    console.log(this.message);
  }
  title = 'first app';
  public scroll;

  @HostListener('window:scroll', ['$event']) onScrollEvent($event){
    const verticalOffset = window.pageYOffset
      || document.documentElement.scrollTop
      || document.body.scrollTop || 0;
    this.scroll = verticalOffset;
  }
}
