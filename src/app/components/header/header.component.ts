import {Component, Inject, Injectable, Input, OnInit} from '@angular/core';
import {AppComponent} from '../../app.component';
import {UserResponse} from '../../models/user-response.model';
import {LoginService} from '../../services/login-service/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: UserResponse;
  constructor(public app: AppComponent, public loginService: LoginService) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (!this.user) {
      this.loginService.logout();
    }
  }
  logout() {
    this.loginService.logout();
  }
}
