import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public token: string = "Bearer ";

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    responseType: 'text' as 'json'
  }

  constructor(private http: HttpClient) {}

  public getToken(login: Login): Observable<string>{
    console.log("Entrou");
    let url = "http://localhost:8099/auth/token";
    return this.http.post<string>(url, login, this.httpOptions).pipe(
      tap((data) => {
        this.token += data;
      })
    )
  }
}