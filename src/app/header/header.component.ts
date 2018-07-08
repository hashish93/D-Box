import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import {AuthService} from "../services/auth-service.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchIcon = faSearch;

  constructor(public authService : AuthService) { }

  ngOnInit() {
  }

  public logout(){
    this.authService.logout().subscribe(data=>{
        localStorage.clear()
    },error=>{
      localStorage.clear()
    });
  }

}
