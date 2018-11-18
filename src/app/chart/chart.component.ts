import { ChartService } from './chart.service';
import { User } from './../models/user';
import { Post } from './../models/post';
import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { stringify } from '@angular/core/src/render3/util';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() posts: Post[];

  private user:User = new User();
  storage = window.localStorage;

  // lineChart
  public lineChartData:Array<any> = [{data:[], label: "LB"},
                                     {data:[], label: "LB"} ];

  public lineChartLabels:Array<any> = [""];

  constructor(private service: ChartService) {
    let authuser = this.storage.getItem("authuser");
    this.user = JSON.parse(authuser);

    this.thirtyDays();
  }

  ngOnInit() {

  }

  private thirtyDays(){
    this.service.getByThirtyDays(this.user.id, this.user.token).subscribe(
      data => {
        this.loadData(data);
      },
      error => {
        alert('bugs');
      }
    );
  }

  ngOnChanges(changes: SimpleChange){
    if(changes['posts']){
      console.log('COMP');
      console.log(this.posts);
    }
  }

  private loadData(returnedPosts:Post[]){
    var labels: Array<any> = [];
    var data: Array<any> = [];
    var target: Array<any> = [];

    returnedPosts.forEach(ps => {
      var dateFormat:string = ps.date.toString();
      labels.push(dateFormat.substring(8,10) + "/" + dateFormat.substring(5,7) + "/" + dateFormat.substring(0,4));
      data.push(ps.weight);
      target.push(this.user.target);
    });

    this.lineChartData = [
      {data: target, label: 'Meta'},
      {data: data, label: 'Peso'}
    ];


    this.lineChartLabels.length = 0;
    for (let i = labels.length - 1; i >= 0; i--) {
      this.lineChartLabels.push(labels[i]);
    }

  }

  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // Green
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(0,129,72,1)',
      pointBackgroundColor: 'rgba(0,129,72,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // Blue
      backgroundColor: 'rgba(41,120,160,0.2)',
      borderColor: 'rgba(41,120,160,1)',
      pointBackgroundColor: 'rgba(41,120,160,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(41,120,160,1)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
