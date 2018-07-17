import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public selected:string = '';

  constructor() { }

  ngOnInit() {
    this.selected = 'favorites'
  }

  public onSelect(event){
    this.selected = event.id;
  }

}
