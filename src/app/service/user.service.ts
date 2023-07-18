import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../users/models/user';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urlBase: string = "http://localhost:8080/user"
  public editar: boolean = false;
  public Userselecionado = new EventEmitter<User>();
  private users: User[] = [];
  private usersSubject = new Subject<User[]>();

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    this.http.get<User[]>(this.urlBase)
      .subscribe(users => this.usersSubject.next(users));
    return this.usersSubject.asObservable();
  }

  public adiciona(user: User) {
    this.users.push(user);
  }

  deleteItem(event: number) {
    return this.users.splice(event, 1);
  }

  public update(userSelecionado: User) {
    const index = this.users.findIndex(user => user.id === userSelecionado.id);
    if (index !== -1) {
      this.users[index] = userSelecionado;
    }
    this.editar = false;
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
