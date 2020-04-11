import { Component, OnInit } from '@angular/core';
import {RegisterService} from '../../../services/register-service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public username: string;
  public password: string;
  constructor(public registerService: RegisterService) { }

  ngOnInit() {}
  register() {
    // this.registerService.register(this.username, this.password);
  }
}
