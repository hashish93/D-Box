import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';
import {NgModule, Inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

import {AppComponent} from './app.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SideMenuComponent} from './side-menu/side-menu.component';
import {AppRouting} from './app.routing';
import {HomeComponent} from './home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {URLInterceptorService} from './services/interceptors/url-interceptor.service';
import {HomeVideosComponent} from './home/home-videos/home-videos.component';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {HomeCreatorComponent} from './home/home-creator/home-creator.component';
import {LoadingComponent} from './comman-components/loading/loading.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MoreViewsComponent} from './home/more-views/more-views.component';
import {RecommendedVideosComponent} from './home/recommended-videos/recommended-videos.component';
import {VistorSignupComponent} from './signup/visitor-signup/vistor-signup.component';
import {CreatorSignupComponent} from './signup/creator-signup/creator-signup.component';
import {LoginComponent} from './login/login.component';
import {FormsModule} from '@angular/forms';
import {AlertModule, CarouselModule, ProgressbarModule, BsDropdownModule, CollapseModule} from 'ngx-bootstrap';
import {SettingsComponent} from './logged-in-components/settings/settings.component';
import {JwtModule, JwtModuleOptions} from '@auth0/angular-jwt';
import {ErrorInterceptorService} from './services/interceptors/error-interceptor.service';
import {JwtInterceptorService} from './services/interceptors/jwt-interceptor.service';
import {ForgetPasswordComponent} from './password/forget-password/forget-password.component';
import {VerifyCodeComponent} from './password/verify-code/verify-code.component';
import {ResetPasswordComponent} from './password/reset-password/reset-password.component';
import {VideoDetailsComponent} from './video-details/video-details.component';
import {AboutCreatorComponent} from './video-details/about-creator/about-creator.component';
import {CategoryDetailsComponent} from './category-details/category-details.component';
import {MoreViewsDetailsComponent} from './comman-components/more-views-details/more-views-details.component';
import {CreatorDetailsComponent} from './creator-details/creator-details.component';
import {CreatorVideosComponent} from './creator-details/creator-videos/creator-videos.component';
import {SideMoreViewsComponent} from './creator-details/side-more-views/side-more-views.component';
import {FavoritesComponent} from './logged-in-components/favorites/favorites.component';
import {FollowersComponent} from './logged-in-components/followers/followers.component';
import {NgxPaginationModule} from 'ngx-pagination/dist/ngx-pagination';
import {RevenueComponent} from './logged-in-components/revenue/revenue.component';
import {FullCalendarModule} from 'ng-fullcalendar';
import {ProfileComponent} from './logged-in-components/profile/profile.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {UploadVideoComponent} from './logged-in-components/upload-video/upload-video.component';
import {TagInputModule} from 'ngx-chips';
import {MyVideosComponent} from './logged-in-components/my-videos/my-videos.component';
import {EditVideoComponent} from './logged-in-components/edit-video/edit-video.component';
import {ProfileMenuComponent} from './header/profile-menu/profile-menu.component';
import {SocialLoginModule, AuthServiceConfig, FacebookLoginProvider} from 'angular-6-social-login';
import {ClickOutsideModule} from 'ng-click-outside';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {StatisticsComponent} from './logged-in-components/statistics/statistics.component';
import {InnerRecommendedVideosComponent} from './video-details/inner-recommended-videos/inner-recommended-videos.component';
import {RecommendedVideosTabsComponent} from './logged-in-components/recommended-videos-tabs/recommended-videos-tabs.component';
import {PlaylistComponent} from './playlist/playlist.component';
import {SidePlayListComponent} from './playlist/side-play-list/side-play-list.component';
import {DataService} from './services/data.service';
import {SideMoreViewsForCreatorComponent} from './creator-details/side-more-views-for-creator/side-more-views-for-creator.component';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {ResultsComponent} from './results/results.component';
import {CreatorsComponent} from './creators/creators.component';
import {ShareButtonsModule} from '@ngx-share/buttons';
import {MetaLoader, MetaModule, MetaStaticLoader, PageTitlePositioning} from '@ngx-meta/core';
import {RelatedVideosComponent} from './category-details/related-videos/related-videos.component';
import {VideoMoreViewsComponent} from './video-details/video-more-views/video-more-views.component';
import {CookieService} from 'ngx-cookie-service';
import {DownloadAppsComponent} from './download-apps/download-apps.component';
import {MyIFrameComponent} from "./iframe-resizer/my-iframe.component";
// for Router import LoadingBarRouterModule:
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';
import {DurationPipe} from './services/pipes/duration.pipe';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

export function tokenGetter() {
    // Client only code.
    if (isPlatformBrowser(this.platformId)) {
        return localStorage.getItem('access_token');
    }
}

const JWT_Module_Options: JwtModuleOptions = {
    config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4200', 'https://piksels-api.n-stream.tv/api/v1/portal/']
    }
};

// Configs
export function getAuthServiceConfigs() {
    const config = new AuthServiceConfig(
        [
            {
                id: FacebookLoginProvider.PROVIDER_ID,
                provider: new FacebookLoginProvider('679774972403653')
            }
        ]
    );
    return config;
}


export function metaFactory(): MetaLoader {
    return new MetaStaticLoader({
        pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
        pageTitleSeparator: ' - ',
        applicationName: '',
        defaults: {
            title: 'Piksels | الرئيسية',
            description: 'Piksels | الرئيسية',
            // 'og:image': 'https://d33wubrfki0l68.cloudfront.net/ca0061c3c33c88b2b124e64ad341e15e2a17af49/c8765/images/alligator-logo3.svg',
            'og:type': 'website',
            'og:locale': 'en_US',
            'og:locale:alternate': 'en_US,nl_NL,tr_TR'
        }
    });
}

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
        SettingsComponent,
        ForgetPasswordComponent,
        VerifyCodeComponent,
        ResetPasswordComponent,
        VideoDetailsComponent,
        AboutCreatorComponent,
        CategoryDetailsComponent,
        MoreViewsDetailsComponent,
        CreatorDetailsComponent,
        CreatorVideosComponent,
        SideMoreViewsComponent,
        FavoritesComponent,
        FollowersComponent,
        RevenueComponent,
        ProfileComponent,
        UploadVideoComponent,
        MyVideosComponent,
        EditVideoComponent,
        ProfileMenuComponent,
        StatisticsComponent,
        InnerRecommendedVideosComponent,
        RecommendedVideosTabsComponent,
        PlaylistComponent,
        SidePlayListComponent,
        SideMoreViewsForCreatorComponent,
        ResultsComponent,
        CreatorsComponent,
        RelatedVideosComponent,
        VideoMoreViewsComponent,
        DownloadAppsComponent,
        MyIFrameComponent,
        DurationPipe
    ],
    imports: [
        BrowserModule.withServerTransition({appId: 'my-app'}),
        BrowserTransferStateModule,
        BrowserAnimationsModule,
        AppRouting,
        MetaModule.forRoot({
            provide: MetaLoader,
            useFactory: (metaFactory)
        }),
        AngularFontAwesomeModule,
        FontAwesomeModule,
        HttpClientModule,
        FormsModule,
        AlertModule.forRoot(),
        TabsModule.forRoot(),
        CarouselModule.forRoot(),
        NgxPaginationModule,
        FullCalendarModule,
        NgSelectModule,
        SimpleNotificationsModule.forRoot(),
        BsDropdownModule.forRoot(),
        TagInputModule,
        ClickOutsideModule,
        SocialLoginModule,
        NgxChartsModule,
        CollapseModule.forRoot(),
        JwtModule.forRoot(JWT_Module_Options),
        //HttpClientModule,       // (Required) For share counts
        ProgressbarModule.forRoot(),
        PerfectScrollbarModule,
        ShareButtonsModule.forRoot(),
        BsDropdownModule.forRoot(),
        LoadingBarRouterModule
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: URLInterceptorService, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true},
        {provide: AuthServiceConfig, useFactory: getAuthServiceConfigs},
        DataService,
        {
            provide: PERFECT_SCROLLBAR_CONFIG,
            useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        },
        CookieService
    ],
})
export class AppModule {

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    }


}

