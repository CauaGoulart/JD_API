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
  private users: User[] = [];
  private usersSubject = new Subject<User[]>();

  constructor(private http: HttpClient, private loginService: LoginService) { }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    responseType: 'text' as 'json'
  }

  public listAll(): Observable<User[]> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.loginService.token
      }),
    };
    this.http.get<User[]>(this.urlBase, httpOptions)
      .subscribe((users) => {
        this.usersSubject.next(users)
      });
    return this.usersSubject.asObservable();
  }


  public adiciona(user: User): Observable<User> {
    return this.http.post<User>(this.urlBase, user, this.httpOptions).pipe(
      tap(() => {
        this.listAll();
        this.updateTableEvent.emit();
      })
    );
  }

  public update(user: User): Observable<User> {
    return this.http.put<User>(this.urlBase, user, this.httpOptions).pipe(
      tap(() => {
        this.listAll();
        this.updateTableEvent.emit();
      })
    );
  }

  public deleteItem(user: User): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${user.id}`, this.httpOptions);
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

}