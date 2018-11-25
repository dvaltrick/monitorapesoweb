import { LoginService } from './login.service';
import { User } from './../models/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material';

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
              private router: Router,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  public login(){
    this.service.login(this.toLoginUser).subscribe(
      data => {
        if(data != null && data.token !== undefined && data.token != null){
          this.authUser = data;
          localStorage.setItem("authuser", JSON.stringify(this.authUser));

          this.router.navigate(['dashboard']);
        }else{
          this.snackBar.open("Usuário ou senha inválidos, tente novamente", "Oooops!!!", {
            duration: 20000
          });
        }

      },
      error => {
        this.snackBar.open("Usuário ou senha inválidos, tente novamente", "Oooops!!!", {
          duration: 20000
        });
      }
    );
  }

}
