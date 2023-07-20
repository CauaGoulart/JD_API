import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http: HttpClient) { }

  public token: string = "Bearer "

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    , responseType: 'text' as 'json'
  }


  public getToken(email: string, password: string) {

    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization':this.token })
      , responseType: 'text' as 'json'
    }

    let url = "http://localhost:8080/auth/token";
    let userLogin = {
      email: email,
      password: password
    }
    this.http.post<string>(url, userLogin, this.httpOptions).subscribe((data) => {
      this.token += data;
    });
  }

}
