import { Component, OnInit } from '@angular/core';
import {Creator} from "../../models/creator.model";
import {CreatorService} from "../../services/creator.service";

@Component({
  selector: 'app-creator-signup',
  templateUrl: './creator-signup.component.html',
  styleUrls: ['./creator-signup.component.scss']
})
export class CreatorSignupComponent implements OnInit {
  public creator: Creator = {} as Creator;
  public error: string = '';
  public loading: boolean = false;
  public success: boolean = false;
  public validatePassword: boolean = false;

  constructor(public creatorService: CreatorService) {
  }

  ngOnInit() {

  }

  public check_password(event) {
    this.validatePassword = !!(this.creator.password && this.creator.password_confirmation && this.creator.password === this.creator.password_confirmation);
  }

  public onFormSubmit(creatorForm) {
    if (creatorForm.valid) {
      console.log(creatorForm);
      this.loading = true;
      this.error = '';
      this.success = false;
      this.creatorService.addVisitor(this.creator).subscribe(data=> {
        console.log(data);
        this.loading = false;
        this.success = true;
      }, err=> {
        this.loading = false;
        this.success = false;
        this.error = JSON.stringify(err.error);
      })
    }
  }
}
