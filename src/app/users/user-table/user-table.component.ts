import { Component, Input, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  public users!: User[];
  public filteredUsers: User[] = [];

  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.service.getUsers().subscribe((data) => {
      this.users = data;
    })
  }


  public deleteItem(event: number) {
    this.service.deleteItem(event);
  }

  public setUserselecionado(user: any) {
    this.service.setUserselecionado(user);

  }

  public filterUsersByName(name: string) {
    if (name) {
      this.filteredUsers = this.users.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
    } else {
      this.filteredUsers = this.users;
    }
  }
}

