import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public user = {
    email: '',
    password: ''
  };

  constructor(private loginService: LoginService) { }

  public loginUser(): void {
    this.loginService.fazerLogin(this.user.email, this.user.password);
  }
}
