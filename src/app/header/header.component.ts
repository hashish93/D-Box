import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {AuthService} from "../services/auth-service.service";
import {CreatorService} from "../services/creator.service";
import {Creator} from "../models/creator.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchIcon = faSearch;
  public user : Creator = {} as Creator;

  constructor(public creatorService : CreatorService,public authService : AuthService) { }

  ngOnInit() {
    this.getUser();
  }

  public getUser() {
    if(this.authService.isAuthenticated()){
      this.creatorService.getUser().subscribe(data=>{
        this.user = data;
      });
    }
  }


}
