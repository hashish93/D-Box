import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth-service.service";
import {Router, ActivatedRoute} from "@angular/router";
import {Creator} from "../../models/creator.model";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  public error : string = '';
  public loading : boolean = false;
  public validatePassword : boolean = false;
  public user : Creator = {} as Creator
  public data : any;
  constructor(public authService : AuthService , public router : Router,public route: ActivatedRoute) { }

  ngOnInit() {
    this.user.email =  this.route.snapshot.paramMap.get('email');
  }

  public check_password(event){
    this.validatePassword = !!(this.user.password && this.user.password_confirmation && this.user.password === this.user.password_confirmation);
  }

  public onFormSubmit(resetPasswordForm){
    if(resetPasswordForm.valid){
      this.loading = true;
      this.error = '';
      this.authService.resetPassword(this.user).subscribe(data=> {
        this.loading = false;
        this.router.navigate(['login']);
      },err=>{
        this.loading = false;
        // this.error = 'صيغة كلمة السر غير صحيحة';
        this.error = JSON.stringify(err.error);
      })
    }
  }
}
