import { Post } from './../models/post';
import { DashboardService } from './dashboard.service';
import { User } from './../models/user';
import { Component, OnInit } from '@angular/core';
import {NgbInputDatepicker, NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private service:DashboardService) {
    let authuser = this.storage.getItem("authuser");
    this.user = JSON.parse(authuser);

    var nowDate = new Date();
    this.dateToShow = {year: nowDate.getFullYear(), 
                       month: nowDate.getMonth() + 1, 
                       day: nowDate.getDate()};

    this.service.getAllByUser(this.user.id, this.user.token).subscribe(
      data => {
        this.posts = data;
        this.lastPost = this.posts[this.posts.length-1];
        this.imc = this.lastPost.weight / (this.user.height * this.user.height);
      },
      error => {
        console.log(error);
        alert('bug');
      }
    );
  }

  public save(){
    this.newPost.user = this.user;
    this.newPost.date = new Date(this.dateToShow.year, 
                                 this.dateToShow.month, 
                                 this.dateToShow.day, 
                                 0, 0, 0, 0);
    console.log(this.newPost)
  }

  ngOnInit() {
  }

}
