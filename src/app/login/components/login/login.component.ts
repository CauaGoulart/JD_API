import { Component } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { Login } from '../../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public login = {} as Login;

  constructor(private service: LoginService) {}

  public getToken(){
    this.service.getToken(this.login).subscribe(() => {
    });
  }
}
