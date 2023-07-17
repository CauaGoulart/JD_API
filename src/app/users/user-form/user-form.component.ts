import { Component } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { User } from '../models/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  public user: User = {
    id: 0,
    name: "",
    email: "",
    password: "",
    roles: ""
  };

  constructor(private service: UserServiceService) { }

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

  ngOnInit(): void {
    this.service.Userselecionado.subscribe(user => {
      this.user = user;
    });
  }
}
