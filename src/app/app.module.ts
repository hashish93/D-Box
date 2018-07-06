import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SideMenuComponent } from './side-menu/side-menu.component';
import {AppRouting} from './app.routing';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpInterceptorService} from "./services/http-interceptor.service";
import { HomeVideosComponent } from './home/home-videos/home-videos.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { HomeCreatorComponent } from './home/home-creator/home-creator.component';
import { LoadingComponent } from './comman-components/loading/loading.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { MoreViewsComponent } from './home/more-views/more-views.component';
import { RecommendedVideosComponent } from './home/recommended-videos/recommended-videos.component';
import { VistorSignupComponent } from './signup/vistor-signup/vistor-signup.component';
import { CreatorSignupComponent } from './signup/creator-signup/creator-signup.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SideMenuComponent,
    HomeComponent,
    HomeVideosComponent,
    HomeCreatorComponent,
    LoadingComponent,
    MoreViewsComponent,
    RecommendedVideosComponent,
    VistorSignupComponent,
    CreatorSignupComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRouting,
    AngularFontAwesomeModule,
    FontAwesomeModule,
    HttpClientModule,
    TabsModule.forRoot()
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
