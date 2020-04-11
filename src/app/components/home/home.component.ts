import { Component, OnInit } from '@angular/core';
import {RestfulClientService} from '../../services/restful-client-service/restful-client.service';
import {UserResponse} from '../../models/user-response.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private restfulClientService: RestfulClientService) { }

  ngOnInit() {
  }

}
