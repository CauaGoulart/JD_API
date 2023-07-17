import { Component } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  constructor(private service: UserServiceService) { }

  public getUser() {
    this.service.getUsers().subscribe((data) => {
      console.log(data);
    });

  }

}
