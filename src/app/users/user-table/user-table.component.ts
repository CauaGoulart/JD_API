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

  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.service.getUsers().subscribe((data) => {
      this.users = data;
    });

    this.service.updateTableEvent.subscribe(() => {
      this.service.getUsers().subscribe((data) => {
        this.users = data;
      });
    });
  }


  public deleteItem(user: User) {
    this.service.deleteItem(user).subscribe(() => {
      this.service.getUsers().subscribe((data) => {
        this.users = data;
      });
    });
  }

  public setUserselecionado(user: any) {
    this.service.setUserselecionado(user);

  }

}

