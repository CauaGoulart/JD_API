import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { LoginService } from 'src/app/login/service/login.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlBase: string = "http://localhost:8080/user"
  public editar: boolean = false;
  public Userselecionado = new EventEmitter<User>();
  public updateTableEvent = new EventEmitter<void>();
  private usersSubject = new Subject<User[]>();

  constructor(private http: HttpClient, private loginService: LoginService) { }

  private getHttpOptions(){
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": this.loginService.token}),
    };
    return httpOptions;
  }

  public listAll(): Observable<User[]> {
    this.http.get<User[]>(this.urlBase, this.getHttpOptions()).subscribe((users) => this.usersSubject.next(users));
    return this.usersSubject.asObservable();
  }


  public adiciona(user: User): Observable<User> {
    return this.http.post<User>(this.urlBase, JSON.stringify(user), this.getHttpOptions())
    .pipe(tap(() => {
      this.listAll();
    }));
  }

  public update(user: User): Observable<User> {
    return this.http.put<User>(this.urlBase, JSON.stringify(user), this.getHttpOptions())
    .pipe(tap(() => {
      this.listAll();
    }));
  }

  public deleteItem(user: User): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${user.id}`, this.getHttpOptions());
  }

  public setUserselecionado(user: User) {
    this.Userselecionado.emit(user);
    this.editar = true;
  }

  public getUsersByName(name: string): Observable<User[]> {
    let url = `${this.urlBase}/name/${name}`;
    this.http.get<User[]>(url)
      .subscribe(users => this.usersSubject.next(users));
    return this.usersSubject.asObservable();
  }

   public getUsersByEmail(email: string): Observable<User[]> {
    let url = `${this.urlBase}/email/${email}`;
    this.http.get<User[]>(url)
      .subscribe(users => this.usersSubject.next(users));
    return this.usersSubject.asObservable();
  }

}