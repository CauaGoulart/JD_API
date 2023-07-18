import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  public user: User = {
    id: 0,
    name: "",
    email: "",
    password: "",
    roles: ""
  };

  constructor(private service: UserService) { }

  public addUser() {
    if (this.service.editar == false) {
      const novoUser: User = {
        id: 0,
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
        roles: this.user.roles
      };
      this.service.adiciona(novoUser);
      this.limparFormulario();
    } else if (this.service.editar == true) {
      const novoUser: User = {
        id: this.user.id,
        name: this.user.name,
        email: this.user.email,
        password: this.user.password,
        roles: this.user.roles
      };
      this.service.update(novoUser);
      this.limparFormulario();
    }
  }

  public limparFormulario() {
    this.user = {
      id: 0,
      name: "",
      email: "",
      password: "",
      roles: ""
    };
  }

  getUsersByName(name: string) {
    this.service.getUsersByName(name).subscribe((users) => {
      this.service.editar = false;
      this.user = users[0];
    });
  }

  ngOnInit(): void {
    this.service.Userselecionado.subscribe(user => {
      this.user = user;
    });
  }
}
