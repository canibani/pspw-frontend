import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {UserResponse} from '../../models/user-response.model';
import {UserRequest} from '../../models/user-request.model';
import {Subject} from 'rxjs';
import {RestfulClientService} from '../restful-client-service/restful-client.service';
import {EventListService} from '../event-services/event-list-service/event-list.service';
import {EventListToEventDataService} from '../event-services/event-list-to-event-data-service/event-list-to-event-data.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends RestfulClientService {
  private userResponseReceived = new Subject<UserResponse>();
  public userResponseReceived$ = this.userResponseReceived.asObservable();
  user: UserResponse;
  constructor(private httpClient: HttpClient,
              private eventListService: EventListService,
              private eventListToEventDataService: EventListToEventDataService) {
    super();
    this.initAuthorizationErrorHandling();
  }
  login(username: string, password: string) {
    const url = 'http://localhost:8080/user/login';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const userRequest = new UserRequest(username, password);
    this.httpClient.post<UserResponse>(url, userRequest, {headers}).subscribe(
      data => this.onSucces(data),
      err => this.onError(err));
  }
  private onSucces(user: UserResponse): void {
    // Update settings
    if (user) {
      this.updateSettings(user.username, user.token);
    } else {
      this.clearStorage();
    }
  }

  private onError(error: HttpErrorResponse): void {
    this.user = undefined;
    this.userResponseReceived.next(this.user);
  }

  private initAuthorizationErrorHandling() {
    // When an error occurs, the user will be logged out.
    this.eventListService.restError$.subscribe(error => this.handleAuthorizationError(error));
    this.eventListToEventDataService.restError$.subscribe(error => this.handleAuthorizationError(error));
  }

  private handleAuthorizationError(error: number) {
    if (error === 403 || error === 401) {
      this.logout();
    }
  }

  logout() {
    this.clearStorage();
  }
}
