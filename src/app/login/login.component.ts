import { Component, OnInit } from '@angular/core';
import {User} from "../models/user.model";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {AuthService} from "../services/auth-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user: User = {} as User;
  public error : string = '';
  public loading : boolean = false;
  constructor(public authService : AuthService ,public router : Router) { }

  ngOnInit() {
    this.user.remember_me = false;
  }

  public onFormSubmit(loginForm){
    if(loginForm.valid){
      console.log(loginForm);
      this.loading = true;
      this.error = '';
      this.authService.login(this.user).subscribe(data=> {
        console.log(data);
        this.loading = false;
        localStorage.setItem('access_token',data.access_token);
        this.router.navigate(['/']);
      },err=>{
        this.loading = false;
        this.error = JSON.stringify(err.error);
      })
    }
  }

}
