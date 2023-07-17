import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  public editar: boolean = false;
  public Userselecionado = new EventEmitter<User>();
  private users: User[] = [];

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    let url = `http://localhost:8080/user`;
    return this.http.get<User[]>(url);
  }

  public getLista() {
    return this.users;
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

}
