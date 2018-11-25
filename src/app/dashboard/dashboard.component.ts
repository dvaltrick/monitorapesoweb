import { Post } from './../models/post';
import { DashboardService } from './dashboard.service';
import { User } from './../models/user';
import { Component, OnInit } from '@angular/core';
import {NgbInputDatepicker, NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  storage = window.localStorage;
  private user:User = new User();
  private posts:Post[] = [];
  private lastPost: Post = new Post();
  private newPost: Post = new Post();
  private dateToShow;
  private imc: number = 0;

  constructor(private service:DashboardService,
              public snackBar: MatSnackBar) {

    let authuser = this.storage.getItem("authuser");
    this.user = JSON.parse(authuser);

    this.load();
  }

  public load(){
    var nowDate = new Date();
    this.dateToShow = {year: nowDate.getFullYear(),
                       month: nowDate.getMonth() + 1,
                       day: nowDate.getDate()};

    this.service.getAllByUser(this.user.id, this.user.token).subscribe(
      data => {
        this.posts = data;
        this.lastPost = this.posts[0];
        this.imc = this.lastPost.weight / (this.user.height * this.user.height);

      },
      error => {
        this.snackBar.open("Algo deu errado, tente novamente mais tarde", "Oooops!!!", {
          duration: 5000
        });
      }
    );
  }

  public save(){
    this.newPost.user = this.user;
    this.newPost.date = new Date(this.dateToShow.year,
                                 this.dateToShow.month-1,
                                 this.dateToShow.day,
                                 0, 0, 0, 0);
    this.service.save(this.newPost, this.user.token).subscribe(
      data => {
        this.load();
        this.newPost = new Post();
        this.snackBar.open("Registro salvo com sucesso", "Sucesso!!!", {
          duration: 5000
        });
      },
      error => {
        this.snackBar.open("Algo deu errado, tente novamente mais tarde", "Oooops!!!", {
          duration: 5000
        });
      }
    );
  }

  public delete(toDelete:Post){
    this.service.delete(toDelete, this.user.token).subscribe(
      data => {
        this.snackBar.open("Registro removido com sucesso", "Sucesso!!!", {
          duration: 5000
        });
        this.load();
      },
      error => {
        this.snackBar.open("Algo deu errado, tente novamente mais tarde", "Oooops!!!", {
          duration: 5000
        });
      }
    );
  }

  ngOnInit() {
  }

}
