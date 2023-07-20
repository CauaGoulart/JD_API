import { Component } from '@angular/core';
import { UserService } from 'src/app/users/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  constructor(private service: UserService) { }

  public getUser() {
    this.service.listAll().subscribe((data) => {
      console.log(data);
    });

  }

}
