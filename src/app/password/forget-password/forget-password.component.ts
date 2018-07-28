import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  public error : string = '';
  public loading : boolean = false;
  public email : string = '';
  constructor(public authService : AuthService , public router : Router) { }

  ngOnInit() {
  }

  public onFormSubmit(visitorForm){
    if(visitorForm.valid){
      this.loading = true;
      this.error = '';
      this.authService.forgetPassword(this.email).subscribe(data=> {
        this.loading = false;
        this.router.navigate(['/verify-code',this.email]);
      },err=>{
        this.loading = false;
        if(err.error.message)
          this.error = 'لم يتم العثور على اي سجل';
        else
          this.error = JSON.stringify(err.error);

      })
    }
  }
}
