import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class LoginService {
  BASE_URL = "http://localhost:5000/api/login";

  constructor(private httpClient:HttpClient) { }

  public login(data:User):Observable<User>{
    return this.httpClient.post<User>(this.BASE_URL,data,httpOptions);
  }


}
