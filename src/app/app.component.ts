import {Component, HostListener, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {NavigationEnd, Router} from '@angular/router';
import {AngularFireLiteMessaging} from 'angularfire-lite';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor( public cookieService: CookieService , public router: Router , public angularFire: AngularFireLiteMessaging , public notificationService : NotificationsService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        (<any>window).ga('set', 'page', event.urlAfterRedirects);
        (<any>window).ga('send', 'pageview');
      }
    });

    this.angularFire.requestPermission().subscribe(data=>{
      console.log(data);
    });
    this.angularFire.token().subscribe(data=>{
      console.log(data);
    });
    this.angularFire.instance().onMessage(data=>{
      console.log(data);
      var new_data : any = data;
      if(new_data && new_data.notification){
          this.notificationService.success(new_data.notification.title,new_data.notification.body,{timeOut:3000});
      }
    });
    this.angularFire.tokenRefresh().subscribe(data=>{
      console.log(data);
    })
  }



  ngOnInit(): void {
    const mobile_redirect = this.cookieService.get('mobile_redirect');
    var ua = navigator.userAgent;
    if(mobile_redirect !== 'false' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)){
      this.cookieService.set( 'mobile_redirect', 'true',1 );
      this.router.navigate(['/download-apps']);
    }
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
