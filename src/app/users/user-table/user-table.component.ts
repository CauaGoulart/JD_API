import { Component } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { User } from '../models/user';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent {
  public users!: User[];

  constructor(private service: UserServiceService) { }

  ngOnInit(): void {
    this.users = this.service.getLista();
  }


  public deleteItem(event: number) {
    this.service.deleteItem(event);
  }

  public setUserselecionado(user: any) {
    this.service.setUserselecionado(user);

  }

}
