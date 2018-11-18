import { Post } from './../models/post';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ChartService {
  BASE_URL = "http://localhost:5000/api/post/";

  constructor(private httpClient:HttpClient) { }

  public getByWeek(id:string, token:string):Observable<Post[]>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    }

    return this.httpClient.get<Post[]>(this.BASE_URL+'byweek/'+id,options);
  }

  public getByMonth(id:string, token:string):Observable<Post[]>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    }

    return this.httpClient.get<Post[]>(this.BASE_URL+'bymonth/'+id,options);
  }

  public getByYear(id:string, token:string):Observable<Post[]>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    }

    return this.httpClient.get<Post[]>(this.BASE_URL+'byyear/'+id,options);
  }

  public getByThirtyDays(id:string, token:string):Observable<Post[]>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    }

    return this.httpClient.get<Post[]>(this.BASE_URL+'bythirtydays/'+id,options);
  }

}
