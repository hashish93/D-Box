import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core/src/metadata/ng_module';
import {SideMenuComponent} from './side-menu/side-menu.component'
import {HomeComponent} from './home/home.component'
import {VistorSignupComponent} from "./signup/visitor-signup/vistor-signup.component";
import {CreatorSignupComponent} from "./signup/creator-signup/creator-signup.component";
import {LoginComponent} from "./login/login.component";
import {SettingsComponent} from "./logged-in-components/settings/settings.component";
import {
    AuthGuardService as AuthGuard
} from './services/guards/auth-guard.service';
import {ForgetPasswordComponent} from "./password/forget-password/forget-password.component";
import {GuestGuardService as GuestGuard} from "./services/guards/guest-guard.service";
import {VerifyCodeComponent} from "./password/verify-code/verify-code.component";
import {ResetPasswordComponent} from "./password/reset-password/reset-password.component";
import {VideoDetailsComponent} from "./video-details/video-details.component";
import {CategoryDetailsComponent} from "./category-details/category-details.component";
import {CreatorDetailsComponent} from "./creator-details/creator-details.component";
import {EditVideoComponent} from "./logged-in-components/edit-video/edit-video.component";
import {PlaylistComponent} from './playlist/playlist.component';
import {ResultsComponent} from './results/results.component';
import {CreatorsComponent} from './creators/creators.component';
import {MetaGuard} from '@ngx-meta/core';
import {DownloadAppsComponent} from './download-apps/download-apps.component';
import {PrivacyPolicyComponent} from './static/privacy-policy/privacy-policy.component';


export const routes: Routes = [
    {
        path: '',
        canActivateChild: [MetaGuard],
        children: [
            {path: '', component: HomeComponent},
            {path: 'download-apps', component: DownloadAppsComponent},
            {path: 'register', redirectTo: 'register/visitor', pathMatch: 'full'},
            {path: 'register/visitor', component: VistorSignupComponent},
            {path: 'join-us', component: CreatorSignupComponent},
            {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
            {path: 'forget-password', component: ForgetPasswordComponent, canActivate: [GuestGuard]},
            {path: 'verify-code/:email', component: VerifyCodeComponent, canActivate: [GuestGuard]},
            {path: 'reset-password/:email', component: ResetPasswordComponent, canActivate: [GuestGuard]},
            {path: 'login', component: LoginComponent, canActivate: [GuestGuard]},
            {
                path: 'video/:id', component: VideoDetailsComponent, /*data: {
          meta: {
            title: 'piksels title',
            description: 'piksels description'
            }
          }*/
            },
            {path: 'category/:id', component: CategoryDetailsComponent},
            {path: 'creator/:id', component: CreatorDetailsComponent},
            {path: 'edit-video/:id', component: EditVideoComponent, canActivate: [AuthGuard]},
            {path: 'results', component: ResultsComponent},
            {path: 'tags', component: ResultsComponent},
            {path: 'creator-videos', component: ResultsComponent},
            {path: 'category-videos', component: ResultsComponent},
            {path: 'watch-later', component: ResultsComponent},
            {path: 'playlist', component: PlaylistComponent},
            {path: 'creators', component: CreatorsComponent},
            {path: 'privacy-policy', component: PrivacyPolicyComponent}
        ]
    },

];
export const AppRouting: ModuleWithProviders = RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'});
