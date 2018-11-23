import {Component, OnInit, Inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {AuthService} from "../services/auth-service.service";
import {CreatorService} from "../services/creator.service";
import {Creator} from "../models/creator.model";
import {CategoryService} from '../services/category.service';
import {Category} from '../models/category.model';
import {AppSettings} from '../app.settings';
import {Router} from '@angular/router';
import {VideoService} from '../services/video.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    searchIcon = faSearch;
    public user: Creator = {} as Creator;
    public categories: Category[] = [];
    public isCollapsed: boolean = true;
    public staticEndPoint: string;
    public search: string = '';
    public page: number = 1;
    public limit: number = 5;
    public loading: boolean = false;
    public searchedData: any = [];
    public more: boolean = false;
    public subscription: any;

    constructor(public creatorService: CreatorService,
                public authService: AuthService,
                public categoryService: CategoryService,
                public router: Router,
                @Inject(PLATFORM_ID) private platformId: Object,
                public videoService: VideoService) {
    }

    ngOnInit() {
        this.staticEndPoint = AppSettings.getStaticEndpoint()
        this.getUser();
        this.getCategories();
    }

    public getUser() {
        if (this.authService.isAuthenticated()) {
            this.creatorService.getUser().subscribe(data => {
                this.user = data;
            });
        }
    }

    public getCategories() {
        this.categoryService.getCategories().subscribe(data => {
            this.categories = data;
        });
    }

    public onFormSubmit(searchForm, customSearch?: string) {
        let search = "";
        if (customSearch) {
            search = customSearch;
        } else {
            search = this.search;
        }
        if (search) {
            this.search = search;
            this.page = 1;
            this.more = false;
            this.searchedData = null;
            this.isCollapsed = true;
            this.router.navigate(['/results'], {queryParams: {'page': 'search', 'key': this.search}});
        }
    }

    public Search(pagedSearch?: any) {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.search) {
            this.loading = true;
            if (!pagedSearch) {
                this.page = 1;
                this.searchedData = [];
            }
            this.subscription = this.videoService.getRegisteredTags(this.page, this.limit, this.search).subscribe(tags => {
                if (this.searchedData == null) {
                    this.searchedData = []
                }
                this.searchedData.push(...tags.data);
                this.more = !!tags.next_page_url;
                this.loading = false;
            });
        }
    }

    public moreSearch() {
        this.page++;
        this.Search(true);
    }

    public logout() {
        // Client only code.
        if (isPlatformBrowser(this.platformId)) {
            this.authService.logout().subscribe(data => {
                localStorage.clear();
            }, error => {
                localStorage.clear();
            });
        }

    }

}

