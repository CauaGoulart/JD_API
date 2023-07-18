import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  public users!: User[];
  public user = {} as User;

  constructor(private service: UserService) { }

  public addUser() {
    this.service.adiciona(this.user).subscribe((data) => {

    })
  }

  public updateUser() {
    this.service.update(this.user).subscribe((data) => {

    })
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
