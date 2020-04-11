import { Component, OnInit} from '@angular/core';
import {LoginService} from './services/login-service/login.service';
import {UserResponse} from './models/user-response.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pspw-frontend';
  public user: UserResponse;
  constructor(private loginService: LoginService) {  }
  ngOnInit() {
    this.loginService.getSettings()
      .then(settings => this.setSettings(settings))
      .catch(error => this.setSettings(undefined));
    this.loginService.settingsChanged$.subscribe(user => this.setSettings(user));
  }

  private setSettings(user: UserResponse): void {
    if (user) {
      this.user = user;
    } else {
      this.user = undefined;
    }
  }
}
