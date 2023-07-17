import { Component, Input, OnInit } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  @Input() users: User[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  public deleteItem(index: number) {
    this.users.splice(index, 1);
  }

  public setUserSelecionado(user: User) {
    console.log(user); // Faça o que for necessário com o usuário selecionado
  }
}

