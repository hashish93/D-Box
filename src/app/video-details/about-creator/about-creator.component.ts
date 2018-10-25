import {Component, OnInit, Input, EventEmitter, Output, OnChanges} from '@angular/core';
import {CreatorService} from "../../services/creator.service";
import {Creator} from "../../models/creator.model";
import {AppSettings} from "../../app.settings";
import {AuthService} from "../../services/auth-service.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
    selector: 'app-about-creator',
    templateUrl: './about-creator.component.html',
    styleUrls: ['./about-creator.component.scss']
})

export class AboutCreatorComponent implements OnInit, OnChanges {

    ngOnChanges(changes: any): void {
        if (changes && changes.creator_id && changes.creator_id.previousValue) {
            this.creator_id = changes.creator_id.previousValue;
            this.getCreator(this.creator_id);
        }
    }

    @Input()
    public creator_id: Number;
    public loading: boolean = true;
    public error: string;
    public creator: Creator = {} as Creator;
    public staticEndPoint;
    @Output() onGetCreator: EventEmitter<any> = new EventEmitter<any>();

    constructor(public creatorService: CreatorService, public authService: AuthService, public router: Router, public userService: UserService) {
    }

    ngOnInit() {
        this.staticEndPoint = AppSettings.getStaticEndpoint();
        this.getCreator(this.creator_id);
    }

    public getCreator(id: Number) {
        this.loading = true;
        this.creatorService.getCreator(id).subscribe(data => {
            this.loading = false;
            this.creator = data;
            this.onGetCreator.emit(this.creator);
        }, err => {
            this.loading = false;
            this.error = JSON.stringify(err.error);
        })
    }

    public followCreator() {
        this.userService.getUserData().subscribe(data => {
            let user = data;
            if (user.id != this.creator_id) {
                if (this.authService.isAuthenticated()) {
                    this.creator.is_followed = !this.creator.is_followed;
                    this.creator.is_followed ? this.creator.counter.likes += 1 : this.creator.counter.likes -= 1;
                    this.creatorService.followCreator(this.creator_id).subscribe(data => {
                    })
                } else {
                    this.router.navigate(['login'])
                }
            }

        })

    }


}
