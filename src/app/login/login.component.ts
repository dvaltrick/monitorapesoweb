import { LoginService } from './login.service';
import { User } from './../models/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private toLoginUser:User = new User();
  private authUser:User = new User();

  storage = window.localStorage;

  constructor(private service:LoginService,
              private router: Router) { }

  ngOnInit() {
  }

  public login(){
    this.service.login(this.toLoginUser).subscribe(
      data => {
        this.authUser = data;
        localStorage.setItem("authuser", JSON.stringify(this.authUser));

        this.router.navigate(['dashboard']);
      },
      error => {
        console.log(error);
        alert('bugs');
      }
    );
  }

}
