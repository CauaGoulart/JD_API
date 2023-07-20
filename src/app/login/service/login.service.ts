import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public login: any = {};
  public token: string = "Bearer "

  constructor(private http: HttpClient) { }


  public fazerLogin(email: string, senha: string): void {
    this.getToken(email, senha).subscribe(
      (token) => {
        this.login.email = email;
        this.login.token = token;
        console.log('Login realizado com sucesso! Token:', token);
      }
    );
  }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    , responseType: 'text' as 'json'
  }


  public getToken(email: string, password: string): Observable<string> {
    const url = "http://localhost:8080/auth/token";
    const userLogin = { email: email, password: password };

    return this.http.post<string>(url, userLogin, { responseType: 'text' as 'json' }).pipe(
      tap((data) => {
        this.token += data;
      })
    );
  }

  public getTokenObservable(email: string, senha: string): Observable<string> {
    return this.getToken(email, senha).pipe(
      tap((token) => {
        this.login.email = email;
        this.login.token = token;
        console.log('Login realizado com sucesso! Token:', token);
      })
    );
  }

}