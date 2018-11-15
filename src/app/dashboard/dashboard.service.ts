import { Post } from './../models/post';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


@Injectable()
export class DashboardService {

  BASE_URL = "http://localhost:5000/api/post/";

  constructor(private httpClient:HttpClient) { }

  public save(data:Post, token:string):Observable<Post>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    }

    return this.httpClient.post<Post>(this.BASE_URL,data,options);
  }

  public delete(data:Post, token:string):Observable<Post>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    }

    return this.httpClient.delete<Post>(this.BASE_URL+data.id,options);
  }

  public getAllByUser(id:string, token:string):Observable<Post[]>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    }

    return this.httpClient.get<Post[]>(this.BASE_URL+'byuser/'+id,options);
  }

}
