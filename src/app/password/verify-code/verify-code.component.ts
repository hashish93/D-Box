import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth-service.service";
import {Router, ActivatedRoute, ParamMap} from "@angular/router";
import {switchMap} from "rxjs/internal/operators";

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss']
})
export class VerifyCodeComponent implements OnInit {
  public error : string = '';
  public loading : boolean = false;
  public email : string = '';
  public code : string = '';
  public data : any;
  constructor(public authService : AuthService , public router : Router,public route: ActivatedRoute) { }

  ngOnInit() {
    this.email =  this.route.snapshot.paramMap.get('email');
  }

  public onFormSubmit(verifyCodeForm){
    if(verifyCodeForm.valid){
      console.log(verifyCodeForm);
      this.loading = true;
      this.error = '';
      this.authService.verifyCode(this.email,this.code).subscribe(data=> {
        console.log(data);
        this.loading = false;
        this.router.navigate(['/reset-password',this.email]);
      },err=>{
        this.loading = false;
        this.error = JSON.stringify(err.error);
      })
    }
  }
}
