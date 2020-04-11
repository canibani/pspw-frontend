import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {EventListModel} from '../../models/event-models/event-list.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  /*constructor(private httpClient: HttpClient) { }
  register(username: string, password: string) {
    const url = 'http://localhost:8080/user/register';
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.httpClient.post<EventListModel>(url, {headers}).subscribe(
      data => this.onSucces(data),
      err => this.onError(err));
  }
  private onSucces(eventListModel: EventListModel): void {
    this.eventListModel = eventListModel;
    this.eventListReceived.next(eventListModel);
  }

  private onError(error: HttpErrorResponse): void {
    this.eventListModel = undefined;
    this.eventListReceived.next(this.eventListModel);
  }
  }*/
}
