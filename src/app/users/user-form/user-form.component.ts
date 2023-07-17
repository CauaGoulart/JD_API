import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Output() addUserEvent = new EventEmitter<User>();
  public user: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    roles: ''
  };

  constructor() { }

  ngOnInit(): void {
  }

  public addUser() {
    this.addUserEvent.emit(this.user);
    this.limparFormulario();
  }

  public limparFormulario() {
    this.user = {
      id: 0,
      name: '',
      email: '',
      password: '',
      roles: ''
    };
  }
}

