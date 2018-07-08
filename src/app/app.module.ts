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
import {URLInterceptorService} from "./services/interceptors/url-interceptor.service";
import { HomeVideosComponent } from './home/home-videos/home-videos.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { HomeCreatorComponent } from './home/home-creator/home-creator.component';
import { LoadingComponent } from './comman-components/loading/loading.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { MoreViewsComponent } from './home/more-views/more-views.component';
import { RecommendedVideosComponent } from './home/recommended-videos/recommended-videos.component';
import { VistorSignupComponent } from './signup/visitor-signup/vistor-signup.component';
import { CreatorSignupComponent } from './signup/creator-signup/creator-signup.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";
import {AlertModule} from "ngx-bootstrap";
import { ProfileComponent } from './profile/profile.component';
import {JwtModule, JwtModuleOptions} from "@auth0/angular-jwt";
import {ErrorInterceptorService} from "./services/interceptors/error-interceptor.service";
import {JwtInterceptorService} from "./services/interceptors/jwt-interceptor.service";
import { ForgetPasswordComponent } from './password/forget-password/forget-password.component';
import { VerifyCodeComponent } from './password/verify-code/verify-code.component';
import { ResetPasswordComponent } from './password/reset-password/reset-password.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

const JWT_Module_Options: JwtModuleOptions = {
  config: {
    tokenGetter: tokenGetter,
    whitelistedDomains: ['localhost:4200', 'https://piksels-api.n-stream.tv/api/v1/portal/']
  }
};
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
    ProfileComponent,
    ForgetPasswordComponent,
    VerifyCodeComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRouting,
    AngularFontAwesomeModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    AlertModule.forRoot(),
    TabsModule.forRoot(),
    JwtModule.forRoot(JWT_Module_Options),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: URLInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
